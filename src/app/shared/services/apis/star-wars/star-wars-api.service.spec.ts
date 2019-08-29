import { TestBed, inject } from '@angular/core/testing';
import { StarWarsApiService } from './star-wars-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StarWarsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [StarWarsApiService]
    });
  });

  it('should be created', inject([StarWarsApiService], (service: StarWarsApiService) => {
    expect(service).toBeTruthy();
  }));
});
