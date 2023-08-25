export type StartBatteryWatchParams = {
    updateLevelInfoCb: (isLow: boolean) => void;
    updateChargeInfoCb: (isCharging: boolean) => void;
};
export declare const startBatteryWatch: ({ updateLevelInfoCb, updateChargeInfoCb }: StartBatteryWatchParams) => Promise<void>;
