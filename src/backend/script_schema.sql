-- CREATE DATABASE cyber_click_bd;

CREATE TABLE public.User (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    role int DEFAULT 1,
    email varchar(30),
    mdp varchar(255),
    nbr_currency DECIMAL DEFAULT 0,
    date_rgbd timestamp DEFAULT current_timestamp
);

CREATE TABLE public.Bonus (
    id serial PRIMARY KEY,
    nom varchar,
    price DECIMAL,
    gain DECIMAL,
    img varchar
);

CREATE TABLE UserHasBonus (
    user_id uuid,
    bonus_id serial,
    number integer,
    PRIMARY KEY (user_id, bonus_id),
    FOREIGN KEY (user_id) REFERENCES public.User(id),
    FOREIGN KEY (bonus_id) REFERENCES Bonus(id)
);

CREATE TABLE public.Stuff (
    id serial PRIMARY KEY,
    nom varchar(20),
    price_puce DECIMAL,
    img varchar
);

CREATE TABLE UserHasStuff (
    user_id uuid,
    stuff_id serial,
    statut boolean,
    PRIMARY KEY (user_id, stuff_id),
    FOREIGN KEY (user_id) REFERENCES public.User(id),
    FOREIGN KEY (stuff_id) REFERENCES Stuff(id)
);

INSERT INTO public.Bonus (nom, price, gain, img)
VALUES
    ('Table SQL', 15, 0.2, 'sql_table.jpg'),
    ('Data Base', 100, 2, 'data_base.jpg'),
    ('Serveur', 1100, 16, 'serveur.jpg'),
    ('Data Center', 12000, 94, 'data_center.jpg'),
    ('Data City', 130000, 520, 'data_city.jpg'),
    ('Puce', 200000, 0, 'puce.jpg');


INSERT INTO public.Stuff (nom, price_puce, img)
VALUES
    ('Bras Robotique', 20, 'gloves.jpg'),
    ('Jambes Robotique', 20, 'legs.jpg'),
    ('Cortex Frontal', 20, 'cortex.jpg'),
    ('Système Armure', 20, 'armor.jpg');
