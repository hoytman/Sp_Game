
        this.powerups = {
            'health_title': {
                title: "Basic",
                text: "These are you basic player upgrades",
                page: 1
            },
            'more_health': {
                text: "Buy more health",
                price: 50,
                active: false,
                page: 1
            },
            'faster': {
                text: "Player moves faster",
                price: 50,
                active: false,
                page: 1,
                target: 'this',
                updates: {
                    playerSpeed: 3
                }
            },
            'faster2': {
                text: "Player moves faster",
                price: 300,
                active: false,
                page: 1,
                requires: 'faster',
                target: 'this',
                updates: {
                    playerSpeed: 4
                }
            },
            'faster3': {
                text: "Player moves faster",
                price: 800,
                active: false,
                page: 1,
                requires: 'faster2',
                target: 'this',
                updates: {
                    playerSpeed: 5
                }
            },
            'leaf_easy': {
                text: "Leaves are easer to collect",
                price: 100,
                active: false,
                page: 1,
            },
            'leaf_easy2': {
                text: "Leaves are a lot easer to collect",
                price: 200,
                active: false,
                page: 1,
                requires: 'leaf_easy'
            },
            'leaf_easy3': {
                text: "Leaves are impossible to miss",
                price: 800,
                active: false,
                page: 1,
                requires: 'leaf_easy2'
            },
            'dodge': {
                text: "You are harder to hit",
                price: 200,
                active: false,
                page: 1,
                target: 'player',
                updates: {
                    size: 10,
                    tall: 20
                }
            },
            'weaponSlotTitle': {
                title: "Weapon Slots",
                text: "In order to hold more than two weapons",
                text2: "you have to buy additional weapons slots!",
                page: 2
            },
            'weaponSlot2': {
                text: "Increase weapon slots from 1 to 2",
                price: 20,
                active: false,
                page: 2,
                target: 'this',
                updates: {
                    weaponSlots: 2
                }
            },
            'weaponSlot3': {
                text: "Increase weapon slots from 2 to 3",
                price: 100,
                active: false,
                page: 2,
                target: 'this',
                updates: {
                    weaponSlots: 3
                },
                requires: 'weaponSlot2'
            },
            'weaponSlot4': {
                text: "Increase weapon slots from 3 to 4",
                price: 500,
                active: false,
                page: 2,
                target: 'this',
                updates: {
                    weaponSlots: 4
                },
                requires: 'weaponSlot3'
            },
            'weaponSlot5': {
                text: "Increase weapon slots from 4 to 5",
                price: 2000,
                active: false,
                page: 2,
                target: 'this',
                updates: {
                    weaponSlots: 5
                },
                requires: 'weaponSlot3'
            },
            'weaponSlot6': {
                text: "Increase weapon slots from 5 to 6",
                price: 5000,
                active: false,
                page: 2,
                target: 'this',
                updates: {
                    weaponSlots: 6
                },
                requires: 'weaponSlot3'
            },
            'weaponSlot6': {
                text: "Increase weapon slots from 6 to 7",
                price: 5000,
                active: false,
                page: 2,
                target: 'this',
                updates: {
                    weaponSlots: 7
                },
                requires: 'weaponSlot3'
            },


            'jb_title': {
                title: "Jelly Beans",
                text: "A low power front firing weapon with some scatter.",
                text2: "Great for weak enemies!",
                page: 3
            },
            'jb_rate': {
                text: "Increase jelly bean fire rate",
                price: 50,
                active: false,
                page: 3,
                target: 'jellyBeans',
                updates: {
                    fire_rate: 90
                }
            },
            'jb_damage': {
                text: "Increase jelly bean damage",
                price: 75,
                active: false,
                page: 3,
                target: 'jellyBeans',
                updates: {
                    power: 2,
                    size: 5
                }
            },
            'jb_double': {
                text: "Fire two jelly beans at once",
                price: 200,
                active: false,
                page: 3
            },
            'jb_range': {
                text: "Jelly Beans go farther",
                price: 30,
                active: false,
                page: 3,
                target: 'jellyBeans',
                updates: {
                    range: 500
                }
            },
            'candyCorn_title': {
                title: "Candy Corn",
                text: "Fires loads of short range candies all around you.",
                text2: "Great against quick enemies.",
                page: 4
            },
            'cc_active': {
                text: "Buy the Candy Corn Weapon",
                price: 100,
                active: false,
                page: 4,
                requires: 'weaponSlots',
            },
            'cc_rate': {
                text: "Increase candy corn fire rate",
                price: 100,
                active: false,
                page: 4,
                target: 'candyCorn',
                updates: {
                    fire_rate: 800
                },
                requires: 'cc_active'
            },
            'cc_damage': {
                text: "Increase candy corn damage",
                price: 100,
                active: false,
                page: 4,
                target: 'candyCorn',
                updates: {
                    power: 2,
                },
                requires: 'cc_active'
            },
            'cc_double': {
                text: "Fire More candy corn each time",
                price: 200,
                active: false,
                page: 4,
                requires: 'cc_active'
            },
            'cc_range': {
                text: "Fire candy corn farther",
                price: 50,
                active: false,
                page: 4,
                target: 'candyCorn',
                updates: {
                    range: 2000,
                },
                requires: 'cc_active'
            },
            'cc_super_range': {
                text: "Fire candy corn alot farther",
                price: 200,
                active: false,
                page: 4,
                target: 'candyCorn',
                updates: {
                    range: 3000,
                },
                requires: 'cc_range'
            },
            'chocolateShield_title': {
                title: "Chocolate Shield",
                text: "Creates a shield of candy around you.",
                text2: "Good against incoming enemies.",
                page: 5
            },
            'chocolateShield_active': {
                text: "Buy the Chocolate Shield Weapon",
                price: 100,
                active: false,
                page: 5,
                requires: 'weaponSlots'
            },
            'chocolateShield_increase': {
                text: "Add 2 more",
                price: 200,
                active: false,
                page: 5,
                requires: 'chocolateShield_active'
            },
            'chocolateShield_dam': {
                text: "Chocolate does more dammage",
                price: 200,
                active: false,
                page: 5,
                target: 'chocolateShield',
                updates: {
                    damage: 2
                },
                requires: 'chocolateShield_active'
            },
            'chocolateShield_wider': {
                text: "Increase chocolate shield width",
                price: 50,
                active: false,
                page: 5,
                target: 'chocolateShield',
                updates: {
                    radius: 150,
                },
                requires: 'chocolateShield_active'
            },
            'chocolateShield_speed': {
                text: "Increase moves faster",
                price: 100,
                active: false,
                page: 5,
                target: 'chocolateShield',
                updates: {
                    turnSpeed: 5,
                },
                requires: 'chocolateShield_active'
            },
            'chocolateShield_speed2': {
                text: "Increase moves much faster",
                price: 200,
                active: false,
                page: 5,
                target: 'chocolateShield',
                updates: {
                    turnSpeed: 3,
                },
                requires: 'chocolateShield_speed'
            },
            'cottonCandy_title': {
                title: "Cotton Candy",
                text: "Drops a large ice cream that damages enemies that touch it.",
                text2: "Great against large groups of weak enemies.",
                page: 9
            },
            'cotton_active': {
                text: "Buy the Cotton Candy Weapon",
                price: 200,
                active: false,
                page: 9,
                requires: 'weaponSlots'
            },
            'cotton_rate': {
                text: "Increase Cotton Candy fire rate",
                price: 100,
                active: false,
                page: 9,
                target: 'cottonCandy',
                updates: {
                    fire_rate: 1200
                },
                requires: 'cotton_active'
            },
            'cotton_damage': {
                text: "Increase Cotton Candy damage",
                price: 100,
                active: false,
                page: 9,
                target: 'cottonCandy',
                updates: {
                    power: 2,
                },
                requires: 'cotton_active'
            },
            'cotton_range': {
                text: "Fire Cotton Candy farther",
                price: 100,
                active: false,
                page: 9,
                target: 'cottonCandy',
                updates: {
                    range: 3000,
                },
                requires: 'cotton_active'
            },
            'cotton_super_range': {
                text: "Fire cotton candy alot farther",
                price: 200,
                active: false,
                page: 9,
                target: 'cottonCandy',
                updates: {
                    range: 5000,
                },
                requires: 'cotton_range'
            },
            'candyBag_title': {
                title: "Candy Bag",
                text: "Launches a bag the shoots candy in all directions.",
                text2: "Gets stronger as you buy more candy types.",
                page: 10
            },
            'candybag_active': {
                text: "Buy the Candy Bag Weapon",
                price: 200,
                active: false,
                page: 10,
                requires: 'weaponSlots'
            },
            'candybag_rate': {
                text: "Increase Candy Bag fire rate",
                price: 100,
                active: false,
                page: 10,
                target: 'candyBag',
                updates: {
                    candyRate: 1.3
                },
                requires: 'candybag_active'
            },
            'candybag_range': {
                text: "Fire Candy Bag farther",
                price: 100,
                active: false,
                page: 10,
                target: 'candyBag',
                updates: {
                    range: 2400,
                },
                requires: 'candybag_active'
            },
            'candybag_range': {
                text: "Fire Candy Bag much farther",
                price: 200,
                active: false,
                page: 10,
                target: 'candyBag',
                updates: {
                    range: 3200,
                },
                requires: 'candybag_active'
            },
            'candybag_more': {
                text: "Candy Bag makes more candy",
                price: 200,
                active: false,
                page: 10,
                target: 'candyBag',
                updates: {
                    range: 3200,
                },
                requires: 'candybag_active'
            },

            'iceCream_title': {
                title: "Ice Cream",
                text: "Stays still and damages enemies that encounter it.",
                text2: "Breaks up into addtional smaller ice creams when hit.",
                page: 12
            },
            'icecream_active': {
                text: "Buy the Ice Cream Weapon",
                price: 200,
                active: false,
                page: 12,
                requires: 'weaponSlots'
            },
            'icecream_rate': {
                text: "Increase Ice Cream fire rate",
                price: 100,
                active: false,
                page: 12,
                target: 'iceCream',
                updates: {
                    fire_rate: 1200
                },
                requires: 'icecream_active'
            },
            'icecream_damage': {
                text: "Increase Ice Cream damage",
                price: 100,
                active: false,
                page: 12,
                target: 'iceCream',
                updates: {
                    power: 2,
                },
                requires: 'icecream_active'
            },
            'icecream_life': {
                text: "Ice Cream lasts longer",
                price: 100,
                active: false,
                page: 12,
                target: 'iceCream',
                updates: {
                    range: 10000,
                },
                requires: 'icecream_active'
            },
            'icecream_generationMax': {
                text: "Ice cream gains another generation",
                price: 200,
                active: false,
                page: 12,
                target: 'iceCream',
                updates: {
                    generationMax: 4,
                },
                requires: 'icecream_active'

            },
            'lollipop_title': {
                title: "Lollipop",
                text: "Bounces off of enemies.",
                text2: "Great against tight groups of enemies.",
                page: 7
            },
            'lollipop_active': {
                text: "Buy the Lollipop Weapon",
                price: 200,
                active: false,
                page: 7,
                requires: 'weaponSlots'
            },
            'lollipop_life': {
                text: "Lollipops last for longer",
                price: 100,
                active: false,
                page: 7,
                target: 'lollipop',
                updates: {
                    range: 1400
                },
                requires: 'lollipop_active'
            },
            'lollipop_life2': {
                text: "Lollipops last for even longer",
                price: 200,
                active: false,
                page: 7,
                target: 'lollipop',
                updates: {
                    range: 2000
                },
                requires: 'lollipop_life'
            },
            'lollipop_life3': {
                text: "Lollipops last for a lot longer",
                price: 300,
                active: false,
                page: 7,
                target: 'lollipop',
                updates: {
                    range: 3000
                },
                requires: 'lollipop_life2'
            },
            'lollipop_damage': {
                text: "Increase Lollipop damage",
                price: 100,
                active: false,
                page: 7,
                target: 'lollipop',
                updates: {
                    power: 2,
                    size: 5,
                },
                requires: 'lollipop_active'
            },
            'peppermint_title': {
                title: "Peppermint",
                text: "A candy that flies around randomly and damages everything.",
                text2: "Great against large numbers of dispersed enemies.",
                page: 8
            },
            'peppermint_active': {
                text: "Buy the Peppermint Weapon",
                price: 200,
                active: false,
                page: 8,
                requires: 'weaponSlots'
            },
            'peppermint_rate': {
                text: "Increase Peppermint fire rate",
                price: 100,
                active: false,
                page: 8,
                target: 'peppermint',
                updates: {
                    fire_rate: 300
                },
                requires: 'peppermint_active'
            },
            'peppermint_damage': {
                text: "Increase Peppermint damage",
                price: 100,
                active: false,
                page: 8,
                target: 'peppermint',
                updates: {
                    power: 2,
                },
                requires: 'peppermint_active'
            },
            'peppermint_life': {
                text: "Increase Peppermint flight time",
                price: 100,
                active: false,
                page: 8,
                target: 'peppermint',
                updates: {
                    range: 3000,
                },
                requires: 'peppermint_active'
            },
            'cake_title': {
                title: "Cake",
                text: "Large Powerful attack.",
                text2: "Great against big enemies.",
                page: 11
            },
            'cake_active': {
                text: "Buy the Cake Weapon",
                price: 200,
                active: false,
                page: 11,
                requires: 'weaponSlots'
            },
            'cake_rate': {
                text: "Increase Cake fire rate",
                price: 100,
                active: false,
                page: 11,
                target: 'cake',
                updates: {
                    fire_rate: 1200
                },
                requires: 'cake_active'
            },
            'cake_damage': {
                text: "Increase Cake damage",
                price: 100,
                active: false,
                page: 11,
                target: 'cake',
                updates: {
                    power: 2,
                },
                requires: 'cake_active'
            },
            'bonbon_title': {
                title: "BonBon",
                text: "Low fire rate but high damage.",
                text2: "Penetrates that enemies that it overcomes.",
                page: 6
            },
            'bonbon_active': {
                text: "Buy the BonBon Weapon",
                price: 200,
                active: false,
                page: 6,
                requires: 'weaponSlots'
            },
            'bonbon_damage': {
                text: "Increase BonBon damage",
                price: 100,
                active: false,
                page: 6,
                target: 'bonbon',
                updates: {
                    power: 5,
                    scale: .12,
                    size: 12
                },
                requires: 'bonbon_active'
            },
            'bonbon_damage2': {
                text: "Increase BonBon damage more",
                price: 200,
                active: false,
                page: 6,
                target: 'bonbon',
                updates: {
                    power: 10,
                    scale: .14,
                    size: 14
                },
                requires: 'bonbon_damage'
            },
            'bonbon_damage3': {
                text: "Increase BonBon damage a lot",
                price: 400,
                active: false,
                page: 6,
                target: 'bonbon',
                updates: {
                    power: 15,
                    scale: .16,
                    size: 16
                },
                requires: 'bonbon_damage2'
            },
            'bonbon_damage4': {
                text: "Increase BonBon damage like crazy",
                price: 800,
                active: false,
                page: 6,
                target: 'bonbon',
                updates: {
                    power: 20,
                    scale: .18,
                    size: 18
                },
                requires: 'bonbon_damage3'
            },

            'cupCake_title': {
                title: "Cup Cake",
                text: "Fires loads of short range cupcakes all around you.",
                text2: "Great against quick enemies.",
                page: 13
            },
            'cupCake_active': {
                text: "Buy the Cup Cake Weapon",
                price: 100,
                active: false,
                page: 13,
                requires: 'weaponSlots'
            },
            'cupCake_rate': {
                text: "Increase cup cake fire rate",
                price: 80,
                active: false,
                page: 13,
                target: 'cupCake',
                updates: {
                    fire_rate: 500
                },
                requires: 'cupCake_active'
            },
            'cupCake_rate2': {
                text: "Increase cup cake fire rate more",
                price: 160,
                active: false,
                page: 13,
                target: 'cupCake',
                updates: {
                    fire_rate: 300
                },
                requires: 'cupCake_active'
            },
            'cupCake_damage': {
                text: "Increase cup cake damage",
                price: 200,
                active: false,
                page: 13,
                target: 'cupCake',
                updates: {
                    power: 2,
                },
                requires: 'cupCake_active'
            },
            'cupCake_double': {
                text: "Fire More cup cakes each time",
                price: 500,
                active: false,
                page: 13,
                requires: 'cupCake_active'
            },
            'cupCake_range': {
                text: "cup cakes last longer",
                price: 100,
                active: false,
                page: 13,
                target: 'cupCake',
                updates: {
                    range: 3000,
                },
                requires: 'cupCake_active'
            },
        }
