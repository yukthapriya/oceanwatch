'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Ship, SubmarineCable, PiracyZone, ProtectedArea, OceanTemperaturePoint, WeatherBuoy, LayerVisibility } from '@/types';

interface GlobeProps {
  ships: Ship[];
  cables: SubmarineCable[];
  piracyZones: PiracyZone[];
  protectedAreas: ProtectedArea[];
  oceanTemperature: OceanTemperaturePoint[];
  weatherBuoys: WeatherBuoy[];
  visibility: LayerVisibility;
  onShipClick: (ship: Ship) => void;
  cameraTarget: { lat: number; lon: number; height: number } | null;
}

const shipColors: Record<Ship['type'], string> = {
  Cargo: '#4488FF',
  Tanker: '#FF8800',
  Fishing: '#44FF88',
  Military: '#FF4444',
  Passenger: '#AA44FF',
};

export default function Globe({
  ships,
  cables,
  piracyZones,
  protectedAreas,
  oceanTemperature,
  weatherBuoys,
  visibility,
  onShipClick,
  cameraTarget,
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<unknown>(null);
  const entitiesRef = useRef<Map<string, unknown>>(new Map());

  const initCesium = useCallback(async () => {
    if (!containerRef.current || viewerRef.current) return;

    try {
      const Cesium = await import('cesium');

      (window as typeof window & { CESIUM_BASE_URL: string }).CESIUM_BASE_URL = '/cesium';

      const token = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN;
      if (token) {
        Cesium.Ion.defaultAccessToken = token;
      } else {
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWE1OWUxNy1mMWZiLTQzYjYtYTQ0OS1kMWFjYmFkNjc5YzciLCJpZCI6NTc3MzMsImlhdCI6MTYyMjY0NDE2OH0.XcKpgANiY19MC4bdFUXMVEBToBmqS8kuYpUlxJHYZxk';
      }

      const viewer = new Cesium.Viewer(containerRef.current, {
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        creditContainer: document.createElement('div'),
      });

      viewerRef.current = viewer;

      try {
        viewer.imageryLayers.removeAll();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const imageryProvider = new Cesium.TileMapServiceImageryProvider({
          url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII'),
        } as any);
        viewer.imageryLayers.addImageryProvider(imageryProvider);
      } catch {
        // Keep default if TMS fails
      }

      if (viewer.scene.skyBox) viewer.scene.skyBox.show = true;
      viewer.scene.globe.enableLighting = false;
      viewer.scene.backgroundColor = Cesium.Color.BLACK;
      viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#0a1628');

      // Force correct canvas size - set canvas dimensions explicitly
      const w = containerRef.current?.clientWidth || window.innerWidth;
      const h = containerRef.current?.clientHeight || window.innerHeight;
      viewer.scene.canvas.width = w;
      viewer.scene.canvas.height = h;
      // Also trigger a resize event for Cesium's internal handlers
      window.dispatchEvent(new Event('resize'));

      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(80.0, 15.0, 20000000),
        duration: 2,
      });

      const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler.setInputAction((click: any) => {
        const picked = viewer.scene.pick(click.position);
        if (picked && picked.id && (picked.id as { _shipData?: Ship })._shipData) {
          onShipClick((picked.id as { _shipData: Ship })._shipData);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // Window resize handler for responsive globe
      const handleResize = () => {
        if (!viewerRef.current) return;
        const container = containerRef.current;
        if (container) {
          viewer.scene.canvas.width = container.clientWidth;
          viewer.scene.canvas.height = container.clientHeight;
        }
      };
      window.addEventListener('resize', handleResize);

    } catch (error) {
      console.error('Failed to initialize Cesium:', error);
    }
  }, [onShipClick]);

  useEffect(() => {
    initCesium();
    return () => {
      const viewer = viewerRef.current as { isDestroyed?: () => boolean; destroy?: () => void } | null;
      if (viewer && !viewer.isDestroyed?.()) {
        viewer.destroy?.();
        viewerRef.current = null;
      }
    };
  }, [initCesium]);

  // Update ship entities
  useEffect(() => {
    const viewer = viewerRef.current as { entities: { remove: (e: unknown) => void; add: (e: unknown) => unknown } } | null;
    if (!viewer) return;

    Array.from(entitiesRef.current.entries()).forEach(([key, entity]) => {
      if (key.startsWith('ship-')) {
        viewer.entities.remove(entity);
        entitiesRef.current.delete(key);
      }
    });

    if (!visibility.ships) return;

    const addShips = async () => {
      try {
        const Cesium = await import('cesium');
        ships.forEach(ship => {
          const color = Cesium.Color.fromCssColorString(shipColors[ship.type]);
          const entity = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(ship.lon, ship.lat),
            point: {
              pixelSize: 8,
              color: color,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 1,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
            label: {
              text: ship.name,
              font: '10px sans-serif',
              fillColor: Cesium.Color.WHITE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 2,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -12),
              show: false,
            },
          });
          (entity as { _shipData?: Ship })._shipData = ship;
          entitiesRef.current.set(`ship-${ship.id}`, entity);
        });
      } catch (e) {
        console.error('Failed to add ships:', e);
      }
    };
    addShips();
  }, [ships, visibility.ships]);

  // Update cable entities
  useEffect(() => {
    const viewer = viewerRef.current as { entities: { remove: (e: unknown) => void; add: (e: unknown) => unknown } } | null;
    if (!viewer) return;

    Array.from(entitiesRef.current.entries()).forEach(([key, entity]) => {
      if (key.startsWith('cable-')) {
        viewer.entities.remove(entity);
        entitiesRef.current.delete(key);
      }
    });

    if (!visibility.cables) return;

    const addCables = async () => {
      try {
        const Cesium = await import('cesium');
        cables.forEach(cable => {
          const positions = cable.coordinates.map(([lon, lat]) =>
            Cesium.Cartesian3.fromDegrees(lon, lat)
          );
          const entity = viewer.entities.add({
            polyline: {
              positions: positions,
              width: 2,
              material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.2,
                color: Cesium.Color.fromCssColorString('#AA44FF').withAlpha(0.8),
              }),
              clampToGround: false,
            },
          });
          (entity as { _cableData?: SubmarineCable })._cableData = cable;
          entitiesRef.current.set(`cable-${cable.id}`, entity);
        });
      } catch (e) {
        console.error('Failed to add cables:', e);
      }
    };
    addCables();
  }, [cables, visibility.cables]);

  // Update piracy zones
  useEffect(() => {
    const viewer = viewerRef.current as { entities: { remove: (e: unknown) => void; add: (e: unknown) => unknown } } | null;
    if (!viewer) return;

    Array.from(entitiesRef.current.entries()).forEach(([key, entity]) => {
      if (key.startsWith('piracy-')) {
        viewer.entities.remove(entity);
        entitiesRef.current.delete(key);
      }
    });

    if (!visibility.piracy) return;

    const addPiracyZones = async () => {
      try {
        const Cesium = await import('cesium');
        piracyZones.forEach(zone => {
          const color = zone.risk_level === 'high'
            ? Cesium.Color.RED
            : zone.risk_level === 'medium'
            ? Cesium.Color.ORANGE
            : Cesium.Color.YELLOW;

          const entity = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(zone.lon, zone.lat),
            ellipse: {
              semiMajorAxis: zone.radius * 1000,
              semiMinorAxis: zone.radius * 1000,
              material: color.withAlpha(0.2),
              outline: true,
              outlineColor: color.withAlpha(0.8),
              outlineWidth: 2,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
          });
          entitiesRef.current.set(`piracy-${zone.id}`, entity);
        });
      } catch (e) {
        console.error('Failed to add piracy zones:', e);
      }
    };
    addPiracyZones();
  }, [piracyZones, visibility.piracy]);

  // Update protected areas
  useEffect(() => {
    const viewer = viewerRef.current as { entities: { remove: (e: unknown) => void; add: (e: unknown) => unknown } } | null;
    if (!viewer) return;

    Array.from(entitiesRef.current.entries()).forEach(([key, entity]) => {
      if (key.startsWith('fishing-')) {
        viewer.entities.remove(entity);
        entitiesRef.current.delete(key);
      }
    });

    if (!visibility.fishing) return;

    const addProtectedAreas = async () => {
      try {
        const Cesium = await import('cesium');
        protectedAreas.forEach(area => {
          const hierarchy = Cesium.Cartesian3.fromDegreesArray(area.coordinates.flat());
          const entity = viewer.entities.add({
            polygon: {
              hierarchy: new Cesium.PolygonHierarchy(hierarchy),
              material: Cesium.Color.GREEN.withAlpha(0.15),
              outline: true,
              outlineColor: Cesium.Color.GREEN.withAlpha(0.7),
              outlineWidth: 2,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
          });
          entitiesRef.current.set(`fishing-${area.id}`, entity);

          area.dark_vessels.forEach(vessel => {
            const dvEntity = viewer.entities.add({
              position: Cesium.Cartesian3.fromDegrees(vessel.lon, vessel.lat),
              point: {
                pixelSize: 6,
                color: Cesium.Color.ORANGE,
                outlineColor: Cesium.Color.RED,
                outlineWidth: 2,
              },
            });
            entitiesRef.current.set(`fishing-dv-${vessel.id}`, dvEntity);
          });
        });
      } catch (e) {
        console.error('Failed to add protected areas:', e);
      }
    };
    addProtectedAreas();
  }, [protectedAreas, visibility.fishing]);

  // Update ocean temperature
  useEffect(() => {
    const viewer = viewerRef.current as { entities: { remove: (e: unknown) => void; add: (e: unknown) => unknown } } | null;
    if (!viewer) return;

    Array.from(entitiesRef.current.entries()).forEach(([key, entity]) => {
      if (key.startsWith('temp-')) {
        viewer.entities.remove(entity);
        entitiesRef.current.delete(key);
      }
    });

    if (!visibility.temperature) return;

    const addTemperature = async () => {
      try {
        const Cesium = await import('cesium');
        oceanTemperature.forEach(point => {
          const t = Math.max(0, Math.min(1, (point.temperature_c + 2) / 34));
          const r = Math.round(t * 255);
          const b = Math.round((1 - t) * 255);
          const color = Cesium.Color.fromBytes(r, 0, b, 180);

          const entity = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(point.lon, point.lat),
            ellipse: {
              semiMajorAxis: 300000,
              semiMinorAxis: 300000,
              material: color,
              heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            },
          });
          entitiesRef.current.set(`temp-${point.id}`, entity);
        });
      } catch (e) {
        console.error('Failed to add temperature:', e);
      }
    };
    addTemperature();
  }, [oceanTemperature, visibility.temperature]);

  // Update weather buoys
  useEffect(() => {
    const viewer = viewerRef.current as { entities: { remove: (e: unknown) => void; add: (e: unknown) => unknown } } | null;
    if (!viewer) return;

    Array.from(entitiesRef.current.entries()).forEach(([key, entity]) => {
      if (key.startsWith('weather-')) {
        viewer.entities.remove(entity);
        entitiesRef.current.delete(key);
      }
    });

    if (!visibility.weather) return;

    const addWeather = async () => {
      try {
        const Cesium = await import('cesium');
        weatherBuoys.forEach(buoy => {
          const windIntensity = Math.min(1, buoy.wind_speed_knots / 40);
          const color = windIntensity > 0.7
            ? Cesium.Color.RED
            : windIntensity > 0.4
            ? Cesium.Color.ORANGE
            : Cesium.Color.CYAN;

          const entity = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(buoy.lon, buoy.lat),
            point: {
              pixelSize: 10,
              color: color,
              outlineColor: Cesium.Color.WHITE,
              outlineWidth: 1,
            },
            label: {
              text: `${buoy.wind_speed_knots.toFixed(0)}kts`,
              font: '10px monospace',
              fillColor: color,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 2,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -14),
            },
          });
          entitiesRef.current.set(`weather-${buoy.id}`, entity);
        });
      } catch (e) {
        console.error('Failed to add weather:', e);
      }
    };
    addWeather();
  }, [weatherBuoys, visibility.weather]);

  // Handle camera fly-to
  useEffect(() => {
    if (!viewerRef.current || !cameraTarget) return;

    const flyTo = async () => {
      try {
        const Cesium = await import('cesium');
        const viewer = viewerRef.current as { camera: { flyTo: (opts: unknown) => void } };
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            cameraTarget.lon,
            cameraTarget.lat,
            cameraTarget.height
          ),
          duration: 2,
        });
      } catch (e) {
        console.error('Failed to fly camera:', e);
      }
    };
    flyTo();
  }, [cameraTarget]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}
    />
  );
}
