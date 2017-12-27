import { InstrumentationService } from './instrumentation.service';
import { HttpBackend } from '@angular/common/http';
export declare class ServerInstrumentationService implements InstrumentationService {
    private httpBackend;
    private url;
    sessionId: string;
    constructor(httpBackend: HttpBackend, url?: string);
    setUrl(url: string): void;
    handleEvent(event: any, type: string): void;
}
