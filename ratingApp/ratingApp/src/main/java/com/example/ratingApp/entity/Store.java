package com.example.ratingApp.entity;

@Entity
@Table(name = "stores")
@Getter @Setter
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 60)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(length = 400)
    private String address;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}
