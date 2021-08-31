/*
Author: Eli Elad Elrom
Website: https://EliElrom.com
License: MIT License
Component: src/recoil/selectors/SelectorsHelper.tsx

Based on .env -> ENVIRONMENT variable
See: https://create-react-app.dev/docs/adding-custom-environment-variables/

implement example;
const URL: string = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, 'service')

*/

export enum EnvironmentTypeEnum {
  OFFLINE = 'offline',
  LOCAL = 'local',
  REMOTE = 'remote',
}

export const CURRENT_ENVIRONMENT_TYPE: string = EnvironmentTypeEnum.REMOTE

export default class SelectorsHelper {
  static getURL(environmentType: string, service: String) {
    let retVal: string = `http://10.12.2.26:8081/${service}`
    switch (environmentType) {
      case EnvironmentTypeEnum.OFFLINE:
        retVal = `${process.env.PUBLIC_URL}/data/${service}.json`
        break
      case EnvironmentTypeEnum.LOCAL:
        retVal = `http://localhost:8081/${service}`
        break
      case EnvironmentTypeEnum.REMOTE:
        // retVal = `http://10.12.2.26:8081/${service}`
        break
    }
    return retVal
  }
  // ** END
}
