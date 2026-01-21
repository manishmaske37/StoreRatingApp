package com.example.ratingApp.entity;

@Getter @Setter
public class AddUserRequest {

    @NotBlank
    @Size(min = 20, max = 60)
    private String name;

    @Email
    private String email;

    @NotBlank
    private String password;

    @Size(max = 400)
    private String address;

    @NotNull
    private Role role;
}
