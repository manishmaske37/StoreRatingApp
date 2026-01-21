package com.example.ratingApp.entity;

@Getter @Setter
public class AddStoreRequest {

    @NotBlank
    @Size(min = 20, max = 60)
    private String name;

    @Email
    private String email;

    @Size(max = 400)
    private String address;
}
