import prisma from './lib/prisma'

async function main() {
    console.log('Clearing old fake data...');
    await prisma.wine.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.about.deleteMany({});
    await prisma.user.deleteMany({}); 
    
    console.log('Inserting real wines...');
    await prisma.wine.createMany({
        data: [
            {
                name: 'Cabernet Sauvignon Reserve 2020',
                description: 'Елегантне червоне сухе вино з глибокими нотами чорної смородини, стиглої вишні та легким відтінком дубової бочки. Ідеально підходить до стейків та витриманих сирів.',
                color: 'Червоне',
                sweetness: 'Сухе',
                volume: 0.75,
                alcohol: '13.5%',
                grapeVariety: 'Каберне Совіньйон',
                country: 'Франція',
                price: 1200,
                inStock: true,
                images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&auto=format&fit=crop']
            },
            {
                name: 'Chardonnay Classic 2022',
                description: 'Освіжаюче біле сухе вино з яскравими ароматами зеленого яблука, цитрусових та легкими нотками ванілі. Чудовий вибір для страв з морепродуктів та білого м\'яса.',
                color: 'Біле',
                sweetness: 'Сухе',
                volume: 0.75,
                alcohol: '12.5%',
                grapeVariety: 'Шардоне',
                country: 'Італія',
                price: 950,
                inStock: true,
                images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop']
            },
            {
                name: 'Pinot Noir Elegance 2021',
                description: 'Витончене червоне напівсухе вино з м\'якими танінами, ароматом малини, полуниці та тонкими пряними нотками. Відмінно поєднується з легкими закусками та пастою.',
                color: 'Червоне',
                sweetness: 'Напівсухе',
                volume: 0.75,
                alcohol: '13.0%',
                grapeVariety: 'Піно Нуар',
                country: 'Чилі',
                price: 1050,
                inStock: true,
                images: ['https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=800&auto=format&fit=crop']
            }
        ]
    });

    console.log('Inserting real posts...');
    await prisma.post.create({
        data: {
            title: 'Як обрати ідеальне вино до вечері: поради від експертів',
            content: 'Вибір вина — це мистецтво, яке може перетворити звичайну вечерю на справжнє свято смаку. Головне правило: білі вина краще пасують до риби, морепродуктяів та птиці, тоді як червоні ідеально розкривають смак червоного м\'яса та витриманих сирів. Не забувайте про температуру подачі: білі вина слід охолоджувати до 10-12°C, а червоні найкраще смакують при кімнатній температурі 16-18°C. Експериментуйте та насолоджуйтесь кожним ковтком!',
            images: ['https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop']
        }
    });

    console.log('Inserting real about text...');
    await prisma.about.create({
        data: {
            content: 'Колекція вин "Олександр Гарновді" — це результат багаторічної пристрасті до виноробства та пошуку найвишуканіших смаків. Ми ретельно відбираємо кожну пляшку, співпрацюючи з найкращими виноградниками з усього світу.\n\nНаша мета — подарувати вам незабутні емоції та справжню насолоду в кожному келиху. Незалежно від того, чи шукаєте ви вино для сімейної вечері, чи для особливої події, у нашій колекції ви знайдете ідеальний варіант, що задовольнить найвибагливіші смаки.'
        }
    });

    console.log('Inserting admin user...');
    await prisma.user.create({
        data: {
            email: 'ssfdssfd0@gmail.com',      
            username: 'admin',              
            password: '12345678',     
           
        }
    });

    console.log('Database seeded successfully!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });