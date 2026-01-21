package com.example.ratingApp.entity;

@Entity
@Table(name = "users")
@Getter @Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 60)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(length = 400)
    private String address;

    @Enumerated(EnumType.STRING)
    private Role role;
}

public enum Role {
    USER,
    ADMIN,
    STORE_OWNER
}
