  this.timeline = [
            // First add 20 sp all over
            // continue with lite sp for a bit
            // create an attack circle of sp
            // then continue sp for a bit.
            // attack with a group of large pumpkins
            // then cont with large and small p 
            // bla
            [
              -1, 'func|createStars'
            ],
            [
              -1, 'func|slideStars'
            ],
            [
              -1, 'func|fadeStars'
            ],
            [
                0, 'smallPumpkin|circle|r:20|s:150'
            ],
            [
                20, 'smallPumpkin|circle|r:0.02',
            ],
            [
                0, 'smallPumpkin|circle|r:20'
            ],
            [
                15, 'smallPumpkin|circle|r:0.015'
            ],
            [
                0, 'largePumpkin|circle|r:10|s:20'
            ],
            [
                30,
                'smallPumpkin|circle|r:0.02',
                'largePumpkin|circle|r:0.01'
            ],
            // Attack with a group of bats
            // Then add bats to the mis
            [
                0, 'blackBat|angle|r:6|s:100'

            ],
            [
                30,
                'smallPumpkin|circle|r:0.02',
                'largePumpkin|circle|r:0.02',
                'blackBat|circle|r:0.005'
            ],
            // Attack with a group of birdMummy
            // Then add birdMummy to the mis
            [
                0, 'birdMummy|angle|r:6|s:100'

            ],
            [
                30,
                'smallPumpkin|circle|r:0.02',
                'largePumpkin|circle|r:0.01',
                'blackBat|circle|r:0.005',
                'birdMummy|circle|r:0.02|'
            ],
            // Attack with a group of birdMummy and bats
            // Then add birdMummy to the mis
            [
                0, 'birdMummy|angle|r:6|s:100',
                'blackBat|angle|r:6|s:100'

            ],
            [
                20,
                'smallPumpkin|circle|r:0.02',
                'largePumpkin|circle|r:0.01',
            ],
            // No pumpkins, just skel.
            [
                40,
                'birdMummy|circle|r:0.03',
                'smallSkeleton|circle|r:0.01',
            ],
            // BAt Attack!
            [
                0, 'blackBat|angle|r:6|s:100'

            ],
            [
                0, 'blackBat|angle|r:6|s:100'

            ],
            [
                0, 'blackBat|angle|r:6|s:100'

            ],
            [
                40,
                'birdMummy|circle|r:0.03',
                'smallSkeleton|circle|r:0.01',
            ],
            // Monster!
            [
                0, 'greenMonster|circle|r:20'
            ],
            [
                20,
                'birdMummy|circle|r:0.03',
                'smallSkeleton|circle|r:0.01',
            ],
            [
                40,
                'birdMummy|circle|r:0.03',
                'smallSkeleton|circle|r:0.01',
                'blackBat|circle|r:0.01|s:100'
            ],
            [
                0, 'largeGhost|angle|r:5|s:50'
            ],
            [
                40,
                'birdMummy|circle|r:0.01',
                'smallSkeleton|circle|r:0.01',
                'blackBat|circle|r:0.01',
                'smallPumpkin|circle|r:0.02',
                'largePumpkin|circle|r:0.01',
            ],
            [
                25,
                'smallPumpkin|circle|r:0.02',
                'largePumpkin|circle|r:0.02',
                'largeSkeleton|circle|r:0.01',
            ],
            [
                0, 'whitch|angle|r:5|s:30'
            ],
            [
                35,
                'smallPumpkin|circle|r:0.02',
                'largePumpkin|circle|r:0.02',
                'largeSkeleton|circle|r:0.01',
            ],
            [
                0, 'largeGhost|circle|r:20',
                'greenMonster|circle|r:20'
            ],
            [
                20,
                'birdMummy|circle|r:0.02',
                'largePumpkin|circle|r:0.02',
            ],
            [
                25,
                'largeSkeleton|circle|r:0.01',
                'whitch|circle|r:0.01',
            ],
            [
                'largeSkeleton|circle|r:0.01',
                'whitch|circle|r:0.01',
            ],
            [
                40,
                'birdMummy|circle|r:0.01',
                'smallSkeleton|circle|r:0.01',
                'blackBat|circle|r:0.01',
                'smallPumpkin|circle|r:0.03',
                'largePumpkin|circle|r:0.01',
                'greenMonster|circle|r:0.01'
            ],
            [
                20,
                'birdMummy|circle|r:0.01',
                'smallSkeleton|circle|r:0.01',
                'blackBat|circle|r:0.01',
            ],
            [
                30, 'wolfEnemy|circle|r:0.01'
            ],
            [
                20, 'whitch|circle|r:0.03',
            ],
            [
                0, 'greenMonster|angle|r:40|s:50'
            ],
            [
                20
            ],
            [
                30, 'mummy|circle|r:0.01'
            ],
            [
                20
            ],
            [
                0, 'largeBoss|angle|r:1'
            ],
            [
                10, 'vineTiny|circle|r:0.03'
            ],
            [
                0, 'vineSmall|angle|r:40|s:50'
            ],
            [
                10, 'vineTiny|circle|r:0.03',
                'vineSmall|circle|r:0.03',
                'vineBig|circle|r:0.03',
            ],
            [
                0, 'vineHuge|circle|r:40'
            ],
            [
                10
            ],
            [
                0, 'vineGiant|circle|r:40'
            ],
            [
                10
            ],
            [
                10, 'vineTiny|circle|r:0.02',
                'vineSmall|circle|r:0.02',
                'vineBig|circle|r:0.02',
                'vineHuge|circle|r:0.005',
                'vineGiant|circle|r:0.002'
            ]
        ];
