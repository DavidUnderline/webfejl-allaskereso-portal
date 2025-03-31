import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataService{
    private data1 = new BehaviorSubject<any>(null);
    private data2 = new BehaviorSubject<any>(null);
    
    data1$ = this.data1.asObservable();
    data2$ = this.data2.asObservable();

    update(value: any): void{
        this.data1.next(value);
    }

    update2(value: any): void{
        this.data2.next(value);
    }
}

