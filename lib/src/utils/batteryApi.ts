export type StartBatteryWatchParams = {
  updateLevelInfoCb: (isLow: boolean) => void;
  updateChargeInfoCb: (isCharging: boolean) => void;
};

export const startBatteryWatch = async ({ updateLevelInfoCb, updateChargeInfoCb }: StartBatteryWatchParams) => {
  const battery = await (navigator as any).getBattery();

  const updateLevelInfo = () => {
    updateLevelInfoCb(battery.level * 100 < 15);
  };

  const updateChargeInfo = () => {
    updateChargeInfoCb(battery.charging);
  };

  const updateAllBatteryInfo = () => {
    updateChargeInfo();
    updateLevelInfo();
  };

  updateAllBatteryInfo();

  battery.addEventListener('chargingchange', () => {
    updateChargeInfo();
  });

  battery.addEventListener('levelchange', () => {
    updateLevelInfo();
  });
};
