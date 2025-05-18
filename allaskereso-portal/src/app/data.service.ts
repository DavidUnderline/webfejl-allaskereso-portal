import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataService{
    private data2 = new BehaviorSubject<any>(null);
    
    data2$ = this.data2.asObservable();

    update2(value: any): void{
        this.data2.next(value);
    }
}

