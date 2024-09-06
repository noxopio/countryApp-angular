import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';
import { Country } from '../../interfaces/country.interface';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  public isLoaded: boolean = false;
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']
  public selectedRegion?: Region;
  constructor(private countriesService: CountriesService) { }
  ngOnInit(): void {
this.countries=this.countriesService.cacheStore.byRegion.countries;
this.selectedRegion=this.countriesService.cacheStore.byRegion.region;

  }

  searchByRegion(region: Region): void {

    this.isLoaded = true;
    this.selectedRegion = region;
    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoaded = false
          ;

      }

      );

  }
}
