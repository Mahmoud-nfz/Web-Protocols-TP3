import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
    private id = 1;
    uuid() : number {
        return this.id ++ ;
    }
}
