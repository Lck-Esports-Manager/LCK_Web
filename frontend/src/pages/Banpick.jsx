import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Banpick.css";

export default function Banpick() {
    const [api, setApi] = useState(
        {
            "league": true,
            "my_team": true,
            "other_team": false,
            "banpick": true,
            "set_num": 1,
            "set_id": 9,
            "data": {
                "top": [
                    {
                        "id": 217,
                        "name": "Fiora",
                        "grade": 1,
                        "position": "Top"
                    },
                    {
                        "id": 218,
                        "name": "Aatrox",
                        "grade": 1,
                        "position": "Top"
                    },
                    {
                        "id": 219,
                        "name": "Camille",
                        "grade": 1,
                        "position": "Top"
                    },
                    {
                        "id": 220,
                        "name": "Darius",
                        "grade": 1,
                        "position": "Top"
                    },
                    {
                        "id": 221,
                        "name": "Poppy",
                        "grade": 1,
                        "position": "Top"
                    },
                    {
                        "id": 222,
                        "name": "Sett",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 223,
                        "name": "Quinn",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 224,
                        "name": "Tahm Kench",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 225,
                        "name": "Tryndamere",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 226,
                        "name": "Riven",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 227,
                        "name": "Akshan",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 228,
                        "name": "Lillia",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 229,
                        "name": "Vayne",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 230,
                        "name": "Malphite",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 231,
                        "name": "Jax",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 232,
                        "name": "Graves",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 233,
                        "name": "Heimerdinger",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 234,
                        "name": "Wukong",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 235,
                        "name": "Kennen",
                        "grade": 2,
                        "position": "Top"
                    },
                    {
                        "id": 236,
                        "name": "Irelia",
                        "grade": 3,
                        "position": "Top"
                    },
                    {
                        "id": 237,
                        "name": "Shen",
                        "grade": 3,
                        "position": "Top"
                    },
                    {
                        "id": 238,
                        "name": "Singed",
                        "grade": 3,
                        "position": "Top"
                    },
                    {
                        "id": 239,
                        "name": "Sylas",
                        "grade": 3,
                        "position": "Top"
                    },
                    {
                        "id": 240,
                        "name": "Teemo",
                        "grade": 3,
                        "position": "Top"
                    },
                    {
                        "id": 241,
                        "name": "Rengar",
                        "grade": 3,
                        "position": "Top"
                    },
                    {
                        "id": 242,
                        "name": "Ornn",
                        "grade": 3,
                        "position": "Top"
                    },
                    {
                        "id": 243,
                        "name": "Kled",
                        "grade": 3,
                        "position": "Top"
                    },
                    {
                        "id": 244,
                        "name": "Gnar",
                        "grade": 3,
                        "position": "Top"
                    },
                    {
                        "id": 245,
                        "name": "Cassiopeia",
                        "grade": 3,
                        "position": "Top"
                    },
                    {
                        "id": 246,
                        "name": "Gangplank",
                        "grade": 3,
                        "position": "Top"
                    },
                    {
                        "id": 247,
                        "name": "Garen",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 248,
                        "name": "Yasuo",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 249,
                        "name": "Pantheon",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 250,
                        "name": "Urgot",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 251,
                        "name": "Yone",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 252,
                        "name": "Nasus",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 253,
                        "name": "Mordekaiser",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 254,
                        "name": "Jayce",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 255,
                        "name": "Maokai",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 256,
                        "name": "Volibear",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 257,
                        "name": "Sion",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 258,
                        "name": "Trundle",
                        "grade": 4,
                        "position": "Top"
                    },
                    {
                        "id": 259,
                        "name": "Vladimir",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 260,
                        "name": "Renekton",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 261,
                        "name": "Illaoi",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 262,
                        "name": "Akali",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 263,
                        "name": "Kayle",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 264,
                        "name": "Rumble",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 265,
                        "name": "Gwen",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 266,
                        "name": "Warwick",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 267,
                        "name": "Dr.Mundo",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 268,
                        "name": "Cho'Gath",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 269,
                        "name": "Yorick",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 270,
                        "name": "Ryze",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 271,
                        "name": "Zac",
                        "grade": 5,
                        "position": "Top"
                    },
                    {
                        "id": 272,
                        "name": "Gragas",
                        "grade": 5,
                        "position": "Top"
                    }
                ],
                "jng": [
                    {
                        "id": 273,
                        "name": "Graves",
                        "grade": 1,
                        "position": "Jungle"
                    },
                    {
                        "id": 274,
                        "name": "Lee Sin",
                        "grade": 1,
                        "position": "Jungle"
                    },
                    {
                        "id": 275,
                        "name": "Elise",
                        "grade": 1,
                        "position": "Jungle"
                    },
                    {
                        "id": 276,
                        "name": "Talon",
                        "grade": 1,
                        "position": "Jungle"
                    },
                    {
                        "id": 277,
                        "name": "Nidalee",
                        "grade": 2,
                        "position": "Jungle"
                    },
                    {
                        "id": 278,
                        "name": "Karthus",
                        "grade": 2,
                        "position": "Jungle"
                    },
                    {
                        "id": 279,
                        "name": "Ekko",
                        "grade": 2,
                        "position": "Jungle"
                    },
                    {
                        "id": 280,
                        "name": "Poppy",
                        "grade": 2,
                        "position": "Jungle"
                    },
                    {
                        "id": 281,
                        "name": "Xin Zhao",
                        "grade": 2,
                        "position": "Jungle"
                    },
                    {
                        "id": 282,
                        "name": "Rek'sai",
                        "grade": 2,
                        "position": "Jungle"
                    },
                    {
                        "id": 283,
                        "name": "Shaco",
                        "grade": 2,
                        "position": "Jungle"
                    },
                    {
                        "id": 284,
                        "name": "Kindred",
                        "grade": 2,
                        "position": "Jungle"
                    },
                    {
                        "id": 285,
                        "name": "Kayn",
                        "grade": 2,
                        "position": "Jungle"
                    },
                    {
                        "id": 286,
                        "name": "Jarvan IV",
                        "grade": 2,
                        "position": "Jungle"
                    },
                    {
                        "id": 287,
                        "name": "Fiddlesticks",
                        "grade": 3,
                        "position": "Jungle"
                    },
                    {
                        "id": 288,
                        "name": "Nunu & Willump",
                        "grade": 3,
                        "position": "Jungle"
                    },
                    {
                        "id": 289,
                        "name": "Taliyah",
                        "grade": 3,
                        "position": "Jungle"
                    },
                    {
                        "id": 290,
                        "name": "Kha'Zix",
                        "grade": 3,
                        "position": "Jungle"
                    },
                    {
                        "id": 291,
                        "name": "Zac",
                        "grade": 3,
                        "position": "Jungle"
                    },
                    {
                        "id": 292,
                        "name": "Evelynn",
                        "grade": 3,
                        "position": "Jungle"
                    },
                    {
                        "id": 293,
                        "name": "Nocturne",
                        "grade": 3,
                        "position": "Jungle"
                    },
                    {
                        "id": 294,
                        "name": "Warwick",
                        "grade": 3,
                        "position": "Jungle"
                    },
                    {
                        "id": 295,
                        "name": "Olaf",
                        "grade": 4,
                        "position": "Jungle"
                    },
                    {
                        "id": 296,
                        "name": "Lillia",
                        "grade": 4,
                        "position": "Jungle"
                    },
                    {
                        "id": 297,
                        "name": "Ivern",
                        "grade": 4,
                        "position": "Jungle"
                    },
                    {
                        "id": 298,
                        "name": "Hecarim",
                        "grade": 4,
                        "position": "Jungle"
                    },
                    {
                        "id": 299,
                        "name": "Gragas",
                        "grade": 4,
                        "position": "Jungle"
                    },
                    {
                        "id": 300,
                        "name": "Rammus",
                        "grade": 4,
                        "position": "Jungle"
                    },
                    {
                        "id": 301,
                        "name": "Trundle",
                        "grade": 4,
                        "position": "Jungle"
                    },
                    {
                        "id": 302,
                        "name": "Viego",
                        "grade": 4,
                        "position": "Jungle"
                    },
                    {
                        "id": 303,
                        "name": "Zed",
                        "grade": 5,
                        "position": "Jungle"
                    },
                    {
                        "id": 304,
                        "name": "Diana",
                        "grade": 5,
                        "position": "Jungle"
                    },
                    {
                        "id": 305,
                        "name": "Viego",
                        "grade": 5,
                        "position": "Jungle"
                    },
                    {
                        "id": 306,
                        "name": "Master Yi",
                        "grade": 5,
                        "position": "Jungle"
                    },
                    {
                        "id": 307,
                        "name": "Sejuani",
                        "grade": 5,
                        "position": "Jungle"
                    },
                    {
                        "id": 308,
                        "name": "Rengar",
                        "grade": 5,
                        "position": "Jungle"
                    },
                    {
                        "id": 309,
                        "name": "Qiyana",
                        "grade": 5,
                        "position": "Jungle"
                    },
                    {
                        "id": 310,
                        "name": "Udyr",
                        "grade": 5,
                        "position": "Jungle"
                    },
                    {
                        "id": 311,
                        "name": "Shyvana",
                        "grade": 5,
                        "position": "Jungle"
                    },
                    {
                        "id": 312,
                        "name": "Rumble",
                        "grade": 5,
                        "position": "Jungle"
                    }
                ],
                "mid": [
                    {
                        "id": 313,
                        "name": "Talon",
                        "grade": 1,
                        "position": "Middle"
                    },
                    {
                        "id": 314,
                        "name": "Vex",
                        "grade": 1,
                        "position": "Middle"
                    },
                    {
                        "id": 315,
                        "name": "Akshan",
                        "grade": 1,
                        "position": "Middle"
                    },
                    {
                        "id": 316,
                        "name": "Katarina",
                        "grade": 1,
                        "position": "Middle"
                    },
                    {
                        "id": 317,
                        "name": "LeBlanc",
                        "grade": 1,
                        "position": "Middle"
                    },
                    {
                        "id": 318,
                        "name": "Singed",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 319,
                        "name": "Zed",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 320,
                        "name": "Yasuo",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 321,
                        "name": "Pantheon",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 322,
                        "name": "Sylas",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 323,
                        "name": "Anivia",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 324,
                        "name": "Yone",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 325,
                        "name": "Qiyana",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 326,
                        "name": "Galio",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 327,
                        "name": "Aurelion Sol",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 328,
                        "name": "Zoe",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 329,
                        "name": "Fizz",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 330,
                        "name": "Ahri",
                        "grade": 2,
                        "position": "Middle"
                    },
                    {
                        "id": 331,
                        "name": "Lissandra",
                        "grade": 3,
                        "position": "Middle"
                    },
                    {
                        "id": 332,
                        "name": "Lucian",
                        "grade": 3,
                        "position": "Middle"
                    },
                    {
                        "id": 333,
                        "name": "Twisted ",
                        "grade": 3,
                        "position": "Middle"
                    },
                    {
                        "id": 334,
                        "name": "Irelia",
                        "grade": 3,
                        "position": "Middle"
                    },
                    {
                        "id": 335,
                        "name": "Cassiopeia",
                        "grade": 3,
                        "position": "Middle"
                    },
                    {
                        "id": 336,
                        "name": "Xerath",
                        "grade": 3,
                        "position": "Middle"
                    },
                    {
                        "id": 337,
                        "name": "Tryndamere",
                        "grade": 3,
                        "position": "Middle"
                    },
                    {
                        "id": 338,
                        "name": "Ekko",
                        "grade": 3,
                        "position": "Middle"
                    },
                    {
                        "id": 339,
                        "name": "Graves",
                        "grade": 3,
                        "position": "Middle"
                    },
                    {
                        "id": 340,
                        "name": "Rumble",
                        "grade": 3,
                        "position": "Middle"
                    },
                    {
                        "id": 341,
                        "name": "Kennen",
                        "grade": 3,
                        "position": "Middle"
                    },
                    {
                        "id": 342,
                        "name": "Viktor",
                        "grade": 4,
                        "position": "Middle"
                    },
                    {
                        "id": 343,
                        "name": "Annie",
                        "grade": 4,
                        "position": "Middle"
                    },
                    {
                        "id": 344,
                        "name": "Sett",
                        "grade": 4,
                        "position": "Middle"
                    },
                    {
                        "id": 345,
                        "name": "Orianna",
                        "grade": 4,
                        "position": "Middle"
                    },
                    {
                        "id": 346,
                        "name": "Kassadin",
                        "grade": 4,
                        "position": "Middle"
                    },
                    {
                        "id": 347,
                        "name": "Malzahar",
                        "grade": 4,
                        "position": "Middle"
                    },
                    {
                        "id": 348,
                        "name": "Kled",
                        "grade": 4,
                        "position": "Middle"
                    },
                    {
                        "id": 349,
                        "name": "Malphite",
                        "grade": 4,
                        "position": "Middle"
                    },
                    {
                        "id": 350,
                        "name": "Riven",
                        "grade": 4,
                        "position": "Middle"
                    },
                    {
                        "id": 351,
                        "name": "Nunu & Willump",
                        "grade": 4,
                        "position": "Middle"
                    },
                    {
                        "id": 352,
                        "name": "Neeko",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 353,
                        "name": "Jayce",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 354,
                        "name": "Vladimir",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 355,
                        "name": "Diana",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 356,
                        "name": "Akali",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 357,
                        "name": "Garen",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 358,
                        "name": "Syndra",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 359,
                        "name": "Renekton",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 360,
                        "name": "Corki",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 361,
                        "name": "Veigar",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 362,
                        "name": "Azir",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 363,
                        "name": "Lux",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 364,
                        "name": "Ryze",
                        "grade": 5,
                        "position": "Middle"
                    },
                    {
                        "id": 365,
                        "name": "Viego",
                        "grade": 5,
                        "position": "Middle"
                    }
                ],
                "adc": [
                    {
                        "id": 366,
                        "name": "Miss Fortune",
                        "grade": 1,
                        "position": "Bottom"
                    },
                    {
                        "id": 367,
                        "name": "Vayne",
                        "grade": 1,
                        "position": "Bottom"
                    },
                    {
                        "id": 368,
                        "name": "Ziggs",
                        "grade": 2,
                        "position": "Bottom"
                    },
                    {
                        "id": 369,
                        "name": "Lucian",
                        "grade": 2,
                        "position": "Bottom"
                    },
                    {
                        "id": 370,
                        "name": "Samira",
                        "grade": 2,
                        "position": "Bottom"
                    },
                    {
                        "id": 371,
                        "name": "Ezreal",
                        "grade": 2,
                        "position": "Bottom"
                    },
                    {
                        "id": 372,
                        "name": "Ashe",
                        "grade": 2,
                        "position": "Bottom"
                    },
                    {
                        "id": 373,
                        "name": "Swain",
                        "grade": 2,
                        "position": "Bottom"
                    },
                    {
                        "id": 374,
                        "name": "Xerath",
                        "grade": 3,
                        "position": "Bottom"
                    },
                    {
                        "id": 375,
                        "name": "Draven",
                        "grade": 3,
                        "position": "Bottom"
                    },
                    {
                        "id": 376,
                        "name": "Jhin",
                        "grade": 3,
                        "position": "Bottom"
                    },
                    {
                        "id": 377,
                        "name": "Caitlyn",
                        "grade": 3,
                        "position": "Bottom"
                    },
                    {
                        "id": 378,
                        "name": "Kai'Sa",
                        "grade": 3,
                        "position": "Bottom"
                    },
                    {
                        "id": 379,
                        "name": "Yasuo",
                        "grade": 4,
                        "position": "Bottom"
                    },
                    {
                        "id": 380,
                        "name": "Jinx",
                        "grade": 4,
                        "position": "Bottom"
                    },
                    {
                        "id": 381,
                        "name": "Aphelios",
                        "grade": 4,
                        "position": "Bottom"
                    },
                    {
                        "id": 382,
                        "name": "Twitch",
                        "grade": 4,
                        "position": "Bottom"
                    },
                    {
                        "id": 383,
                        "name": "Tristana",
                        "grade": 4,
                        "position": "Bottom"
                    },
                    {
                        "id": 384,
                        "name": "Cassiopeia",
                        "grade": 5,
                        "position": "Bottom"
                    },
                    {
                        "id": 385,
                        "name": "Sivir",
                        "grade": 5,
                        "position": "Bottom"
                    },
                    {
                        "id": 386,
                        "name": "Xayah",
                        "grade": 5,
                        "position": "Bottom"
                    },
                    {
                        "id": 387,
                        "name": "Kog'Maw",
                        "grade": 5,
                        "position": "Bottom"
                    },
                    {
                        "id": 388,
                        "name": "Kalista",
                        "grade": 5,
                        "position": "Bottom"
                    },
                    {
                        "id": 389,
                        "name": "Varus",
                        "grade": 5,
                        "position": "Bottom"
                    }
                ],
                "sup": [
                    {
                        "id": 390,
                        "name": "Amumu",
                        "grade": 1,
                        "position": "Support"
                    },
                    {
                        "id": 391,
                        "name": "Blitzcrank",
                        "grade": 1,
                        "position": "Support"
                    },
                    {
                        "id": 392,
                        "name": "Leona",
                        "grade": 1,
                        "position": "Support"
                    },
                    {
                        "id": 393,
                        "name": "Maokai",
                        "grade": 1,
                        "position": "Support"
                    },
                    {
                        "id": 394,
                        "name": "Thresh",
                        "grade": 2,
                        "position": "Support"
                    },
                    {
                        "id": 395,
                        "name": "Lulu",
                        "grade": 2,
                        "position": "Support"
                    },
                    {
                        "id": 396,
                        "name": "Yuumi",
                        "grade": 2,
                        "position": "Support"
                    },
                    {
                        "id": 397,
                        "name": "Nami",
                        "grade": 2,
                        "position": "Support"
                    },
                    {
                        "id": 398,
                        "name": "Morgana",
                        "grade": 2,
                        "position": "Support"
                    },
                    {
                        "id": 399,
                        "name": "Nautilus",
                        "grade": 2,
                        "position": "Support"
                    },
                    {
                        "id": 400,
                        "name": "Alistar",
                        "grade": 2,
                        "position": "Support"
                    },
                    {
                        "id": 401,
                        "name": "Pyke",
                        "grade": 2,
                        "position": "Support"
                    },
                    {
                        "id": 402,
                        "name": "Rell",
                        "grade": 2,
                        "position": "Support"
                    },
                    {
                        "id": 403,
                        "name": "Xerath",
                        "grade": 2,
                        "position": "Support"
                    },
                    {
                        "id": 404,
                        "name": "Taliyah",
                        "grade": 2,
                        "position": "Support"
                    },
                    {
                        "id": 405,
                        "name": "Zilean",
                        "grade": 3,
                        "position": "Support"
                    },
                    {
                        "id": 406,
                        "name": "Soraka",
                        "grade": 3,
                        "position": "Support"
                    },
                    {
                        "id": 407,
                        "name": "Braum",
                        "grade": 3,
                        "position": "Support"
                    },
                    {
                        "id": 408,
                        "name": "Rakan",
                        "grade": 3,
                        "position": "Support"
                    },
                    {
                        "id": 409,
                        "name": "Shaco",
                        "grade": 3,
                        "position": "Support"
                    },
                    {
                        "id": 410,
                        "name": "Senna",
                        "grade": 3,
                        "position": "Support"
                    },
                    {
                        "id": 411,
                        "name": "Bard",
                        "grade": 3,
                        "position": "Support"
                    },
                    {
                        "id": 412,
                        "name": "Zyra",
                        "grade": 3,
                        "position": "Support"
                    },
                    {
                        "id": 413,
                        "name": "Karma",
                        "grade": 4,
                        "position": "Support"
                    },
                    {
                        "id": 414,
                        "name": "Janna",
                        "grade": 4,
                        "position": "Support"
                    },
                    {
                        "id": 415,
                        "name": "Shen",
                        "grade": 4,
                        "position": "Support"
                    },
                    {
                        "id": 416,
                        "name": "Sona",
                        "grade": 4,
                        "position": "Support"
                    },
                    {
                        "id": 417,
                        "name": "Galio",
                        "grade": 4,
                        "position": "Support"
                    },
                    {
                        "id": 418,
                        "name": "Zac",
                        "grade": 4,
                        "position": "Support"
                    },
                    {
                        "id": 419,
                        "name": "Poppy",
                        "grade": 4,
                        "position": "Support"
                    },
                    {
                        "id": 420,
                        "name": "Seraphine",
                        "grade": 4,
                        "position": "Support"
                    },
                    {
                        "id": 421,
                        "name": "Taric",
                        "grade": 4,
                        "position": "Support"
                    },
                    {
                        "id": 422,
                        "name": "Vex",
                        "grade": 5,
                        "position": "Support"
                    },
                    {
                        "id": 423,
                        "name": "Brand",
                        "grade": 5,
                        "position": "Support"
                    },
                    {
                        "id": 424,
                        "name": "Lux",
                        "grade": 5,
                        "position": "Support"
                    },
                    {
                        "id": 425,
                        "name": "Anivia",
                        "grade": 5,
                        "position": "Support"
                    },
                    {
                        "id": 426,
                        "name": "Pantheon",
                        "grade": 5,
                        "position": "Support"
                    },
                    {
                        "id": 427,
                        "name": "Vel'Koz",
                        "grade": 5,
                        "position": "Support"
                    },
                    {
                        "id": 428,
                        "name": "Swain",
                        "grade": 5,
                        "position": "Support"
                    },
                    {
                        "id": 429,
                        "name": "Veigar",
                        "grade": 5,
                        "position": "Support"
                    },
                    {
                        "id": 430,
                        "name": "Sett",
                        "grade": 5,
                        "position": "Support"
                    },
                    {
                        "id": 431,
                        "name": "Gragas",
                        "grade": 5,
                        "position": "Support"
                    },
                    {
                        "id": 432,
                        "name": "Trundle",
                        "grade": 5,
                        "position": "Support"
                    }
                ]
            }
        }
        /* "top": [
         {
             "id": 217,
             "name": "Fiora",
             "grade": 1,
             "position": "Top"
         },*/
    );/*
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                axios.post('/api/progressleague/'
                ).then((response) => {
                    console.log(response.data);
                })
            } catch (e) { console.log(e); }
        };
        fetchUsers();
    }, []);*/
    let bpTitle = "챔피언 선택";
    let bpSubTitle = ['RED Team Ban 1/3', 'RED Team Ban 2/3', 'RED Team Ban 3/3',
        'BLUE Team Ban 1/3', 'BLUE Team Ban 2/3', 'BLUE Team Ban 3/3', 'BLUE Team pick 1'
        , 'RED Team pick 1/2', 'RED Team pick 2/2', 'BLUE Team pick 1/2', 'BLUE Team pick 2/2',
        'RED Team pick 1', 'RED Team Ban 1', 'BLUE Team Ban 1', 'RED Team Ban 1',
        'BLUE Team Ban 1', 'RED Team pick 1', 'BLUE Team pick 1/2', 'BLUE Team pick 2/2', 'RED Team pick 1'];
    let [iTurn, setTurn] = useState(0);

    const [chamList, setChamList] = useState({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        7: null,
        8: null,
        9: null,
        10: null,
        11: null,
        12: null,
        13: null,
        14: null,
        15: null,
        16: null,
        17: null,
        18: null,
        19: null,
        20: null
    });

    const nextTurn = () => {
        if (iTurn >= 19) {
            alert('챔피언 선택이 완료되었습니다.');
            document.location.href = '/game';
        }
        else if (chamList[iTurn] === null) {
            alert('챔피언을 선택해주세요.');
        }
        else {
            setTurn(iTurn + 1);
            console.log(`현재 ${iTurn} 단계`);
        }
    }

    const Pick = (cham) => {
        for (let i = 0; i < iTurn; i++) {
            if (cham.id === chamList[i].id) {
                alert('다른 챔피언으로 다시 선택해주십시오.');
                return
            }
        }
        console.log(cham);
        setChamList({
            ...chamList,
            [iTurn]: cham,
        })
        console.log(chamList);
    }
    const printList = (i) => {
        if (i === iTurn) {
            return chamList[i] ?
                <ul className="special">
                    <li className="grade">{chamList[i].grade}</li>
                    <li className="pos">{chamList[i].position}</li>
                    <li className="name">{chamList[i].name}</li>
                </ul> : "";
        }
        else {
            return chamList[i] ?
                <ul>
                    <li className="grade">{chamList[i].grade}</li>
                    <li className="pos">{chamList[i].position}</li>
                    <li className="name">{chamList[i].name}</li>
                </ul> : "";
        }
    }
    // const cardPtr = (i) => {
    //     return chamList[i] ?
    //         <ul className="special">
    //             <li className="grade">{chamList[i].grade}</li>
    //             <li className="pos">{chamList[i].position}</li>
    //             <li className="name">{chamList[i].name}</li>
    //         </ul> : "";
    // }
    return (<>
        <div className="BP--main">
            <div className="BP--inner">
                <div className="BPbox">
                    <div className="contents">
                        <div className="titles">
                            <div className="BP--title">
                                {bpTitle}
                            </div>
                            <div className="BP--Subtitle">
                                {bpSubTitle[iTurn]}
                            </div>
                            <div className="nextBtn" onClick={nextTurn}>
                                NEXT
                            </div>
                        </div>
                        <ul>
                            <li className="ban">
                                <div className="pick">
                                    <div className="title">BAN</div>
                                    <ul className="cardbar">
                                        <li className="card">{printList(0)} </li>
                                        <li className="card">{printList(1)} </li>
                                        <li className="card">{printList(2)} </li>
                                        <li className="card">{printList(3)} </li>
                                        <li className="card">{printList(4)} </li>
                                        <li className="card">{printList(5)} </li>
                                        <li className="card">{printList(12)} </li>
                                        <li className="card">{printList(13)} </li>
                                        <li className="card">{printList(14)} </li>
                                        <li className="card">{printList(15)} </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="blue">
                                <div className="pick">
                                    <div className="title">BLUE</div>
                                    <ul className="cardbar">
                                        <li className="card">{printList(6)} </li>
                                        <li className="card">{printList(9)} </li>
                                        <li className="card">{printList(10)} </li>
                                        <li className="card">{printList(17)} </li>
                                        <li className="card">{printList(18)} </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="chams">
                                <div className="list">
                                    {(api && api.data.top.map((cham) => (
                                        <ul onClick={() => { Pick(cham) }}>
                                            <li className="grade">{cham.grade}</li>
                                            <li className="pos">{cham.position}</li>
                                            <li className="name">{cham.name}</li>
                                        </ul>
                                    )))}
                                    {api && api.data.jng.map((cham) => (
                                        <ul onClick={() => { Pick(cham) }}>
                                            <li className="grade">{cham.grade}</li>
                                            <li className="pos">{cham.position}</li>
                                            <li className="name">{cham.name}</li>
                                        </ul>
                                    ))}
                                    {api && api.data.mid.map((cham) => (
                                        <ul onClick={() => { Pick(cham) }}>
                                            <li className="grade">{cham.grade}</li>
                                            <li className="pos">{cham.position}</li>
                                            <li className="name">{cham.name}</li>
                                        </ul>
                                    ))}
                                    {api && api.data.adc.map((cham) => (
                                        <ul onClick={() => { Pick(cham) }}>
                                            <li className="grade">{cham.grade}</li>
                                            <li className="pos">{cham.position}</li>
                                            <li className="name">{cham.name}</li>
                                        </ul>
                                    ))}
                                    {api && api.data.sup.map((cham) => (
                                        <ul onClick={() => { Pick(cham) }}>
                                            <li className="grade">{cham.grade}</li>
                                            <li className="pos">{cham.position}</li>
                                            <li className="name">{cham.name}</li>
                                        </ul>
                                    ))}
                                </div>
                            </li>
                            <li className="red">
                                <div className="pick">
                                    <div className="title">RED</div>
                                    <ul className="cardbar">
                                        <li className="card">{printList(7)} </li>
                                        <li className="card">{printList(8)} </li>
                                        <li className="card">{printList(11)} </li>
                                        <li className="card">{printList(16)} </li>
                                        <li className="card">{printList(19)} </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    </>);
}