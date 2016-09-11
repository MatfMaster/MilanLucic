import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProcenaRizikaVrsteVrednostiService {
    baseUrl = 'api/procenarizikavrstevrednosti';
    constructor(public http: Http) { }

    get(url: string = '') {
        return this.http.get(this.baseUrl + url)
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });
    }


    public getPretnjeRaznjivostiZaVrstuVrednosti(id: number) {
        return this.http.get(this.baseUrl + '/pretnjeranjivostizavrstuvrednosti/' + id)
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });

    }

    public togglePretnjaRanjivost(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + '/togglepretnjaranjivost', JSON.stringify(data), { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });
    }

    public getPrimenjeneMereZaPretnjeRaznjivostiZaVrstuVrednosti(id: number) {
        return this.http.get(this.baseUrl + '/primenjenemerezapretnjeranjivostizavrstuvrednosti/' + id)
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });

    }


    public togglePrimenjeneMere(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + '/toggleprimenjenamera', JSON.stringify(data), { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });
    }

    public dodajProcenuRizika(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.baseUrl + '/procenarizika', JSON.stringify(data), { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });
    }

    public azurirajProcenuRizika(data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.put(this.baseUrl + '/procenarizika', JSON.stringify(data), { headers: headers })
            .map((res: Response) => res.json())
            .catch(res => {
                let message = "Greška na serveru: " + res.status + ' - ' + res.statusText + "\n\n" + res.url;
                return Observable.throw(message);
            });
    }

}