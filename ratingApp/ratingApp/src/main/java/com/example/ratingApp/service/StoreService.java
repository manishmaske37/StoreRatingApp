package com.example.ratingApp.controller;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;

    public Store createStore(AddStoreRequest request) {
        Store store = new Store();
        store.setName(request.getName());
        store.setEmail(request.getEmail());
        store.setAddress(request.getAddress());
        return storeRepository.save(store);
    }
}
