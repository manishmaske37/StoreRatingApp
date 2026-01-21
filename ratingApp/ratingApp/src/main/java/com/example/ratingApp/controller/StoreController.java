package com.example.ratingApp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ratingApp.model.RatingDTO;


@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
@CrossOrigin
public class StoreController {

    private final StoreService storeService;

    @PostMapping
    public ResponseEntity<?> createStore(
            @Valid @RequestBody AddStoreRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(storeService.createStore(request));
    }
}

