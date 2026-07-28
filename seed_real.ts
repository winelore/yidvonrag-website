import 'dotenv/config';
import prisma from './lib/prisma';
// coca cola

async function main() {
    console.log('Clearing old fake data...');
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.award.deleteMany({});
    await prisma.wine.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.about.deleteMany({});
    
    console.log('Inserting real wines with awards...');
    await prisma.wine.create({
        data: {
            name: 'Cabernet Sauvignon Reserve 2020',
            description: 'Елегантне червоне сухе вино з глибокими нотами чорної смородини, стиглої вишні та легким відтінком дубової бочки. Ідеально підходить до стейків та витриманих сирів.',
            color: 'Червоне',
            sweetness: 'Сухе',
            volume: 0.75,
            alcohol: '13.5%',
            grapeVariety: 'Каберне Совіньйон',
            price: 1200,
            inStock: true,
            images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&auto=format&fit=crop'],
            awards: {
                create: [
                    {
                        title: 'Золота медаль 2024',
                        year: '2024',
                        description: 'Міжнародний конкурс крафтового виноробства Odesa Wine Week',
                        image: 'preset:gold-medal'
                    },
                    {
                        title: 'Вибір Сомельє',
                        year: '2023',
                        description: 'Top 10 червоних вин України за версією Асоціації Сомельє',
                        image: 'preset:sommelier-choice'
                    }
                ]
            }
        }
    });

    await prisma.wine.create({
        data: {
            name: 'Chardonnay Classic 2022',
            description: 'Освіжаюче біле сухе вино з яскравими ароматами зеленого яблука, цитрусових та легкими нотками ванілі. Чудовий вибір для страв з морепродуктів та білого м\'яса.',
            color: 'Біле',
            sweetness: 'Сухе',
            volume: 0.75,
            alcohol: '12.5%',
            grapeVariety: 'Шардоне',
            price: 950,
            inStock: true,
            images: ['https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop'],
            awards: {
                create: [
                    {
                        title: 'Гран-прі Якості',
                        year: '2023',
                        description: 'Фестиваль вин Закарпаття, 1-ше місце у категорії білих вин',
                        image: 'preset:grand-prix'
                    }
                ]
            }
        }
    });

    await prisma.wine.create({
        data: {
            name: 'Pinot Noir Elegance 2021',
            description: 'Витончене червоне напівсухе вино з м\'якими танінами, ароматом малини, полуниці та тонкими пряними нотками. Відмінно поєднується з легкими закусками та пастою.',
            color: 'Червоне',
            sweetness: 'Напівсухе',
            volume: 0.75,
            alcohol: '13.0%',
            grapeVariety: 'Піно Нуар',
            price: 1050,
            inStock: true,
            images: ['https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?w=800&auto=format&fit=crop'],
            awards: {
                create: [
                    {
                        title: 'Срібна медаль 2022',
                        year: '2022',
                        description: 'Всеукраїнський дегустаційний конкурс',
                        image: 'preset:silver-medal'
                    }
                ]
            }
        }
    });

    console.log('Inserting real posts...');
    await prisma.post.create({
        data: {
            title: 'Як обрати ідеальне вино до вечері: поради від експертів',
            content: 'Вибір вина — це мистецтво, яке може перетворити звичайну вечерю на справжнє свято смаку. Головне правило: білі вина краще пасують до риби, морепродуктів та птиці, тоді як червоні ідеально розкривають смак червоного м\'яса та витриманих сирів. Не забувайте про температуру подачі: білі вина слід охолоджувати до 10-12°C, а червоні найкраще смакують при кімнатній температурі 16-18°C. Експериментуйте та насолоджуйтесь кожним ковтком!',
            images: ['https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop']
        }
    });

    console.log('Inserting real about text...');
    await prisma.about.create({
        data: {
            content: 'Колекція вин "Олександр Гарновді" — це результат багаторічної пристрасті до виноробства та пошуку найвишуканіших смаків. Ми ретельно відбираємо кожну пляшку, співпрацюючи з найкращими виноградниками з усього світу.\n\nНаша мета — подарувати вам незабутні емоції та справжню насолоду в кожному келиху. Незалежно від того, чи шукаєте ви вино для сімейної вечері, чи для особливої події, у нашій колекції ви знайдете ідеальний варіант, що задовольнить найвибагливіші смаки.'
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
