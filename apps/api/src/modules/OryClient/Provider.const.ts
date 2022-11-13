import { V0alpha2Api, Configuration } from '@ory/client';
import { environment } from 'src/environments';
import { ORY_CLIENT } from './Client.symbol';

export const ClientProvider = {
  provide: ORY_CLIENT,
  useFactory: (): V0alpha2Api => {
    return new V0alpha2Api(new Configuration({
      basePath: environment.authorization.apiUrl,
    }));
  },
};