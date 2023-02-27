import { Global, Injectable, Module } from '@nestjs/common';
// import { CommonService } from './common.service';
import { randomUUID } from 'crypto';
import { Model } from './Model';

const uuidProvider = {
  'provide' : 'UUID',
  'useValue': randomUUID,
};
@Global()
@Module({
  providers: [uuidProvider],
  exports: [
    uuidProvider,
  ]
})
export class CommonModule {}
