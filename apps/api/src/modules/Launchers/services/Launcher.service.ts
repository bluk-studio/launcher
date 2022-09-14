import { LauncherConfig } from '$types/web_to_desktop/launcher/LauncherConfig';
import { Injectable } from '@nestjs/common';
import { LaunchersStorage } from '../storage';

@Injectable()
export class LauncherService {
  // Fetch launcher by it's id
  public fetchById(id: string): Array<LauncherConfig> {
    return LaunchersStorage.filter((config) => config.id == id);
  };

  // Fetch all launchers
  public fetchAll() {
    return LaunchersStorage;
  };
};