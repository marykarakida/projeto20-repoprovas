import client from '../src/config/prisma';

async function main() {
    await client.term.upsert({ where: { number: 1 }, update: {}, create: { number: 1 } });
    await client.term.upsert({ where: { number: 2 }, update: {}, create: { number: 2 } });
    await client.term.upsert({ where: { number: 3 }, update: {}, create: { number: 3 } });
    await client.term.upsert({ where: { number: 4 }, update: {}, create: { number: 4 } });
    await client.term.upsert({ where: { number: 5 }, update: {}, create: { number: 5 } });
    await client.term.upsert({ where: { number: 6 }, update: {}, create: { number: 6 } });

    await client.category.upsert({ where: { name: 'Projeto' }, update: {}, create: { name: 'Projeto' } });
    await client.category.upsert({ where: { name: 'Prática' }, update: {}, create: { name: 'Prática' } });
    await client.category.upsert({ where: { name: 'Recuperação' }, update: {}, create: { name: 'Recuperação' } });

    await client.discipline.upsert({ where: { name: 'HTML e CSS' }, update: { termId: 1 }, create: { name: 'HTML e CSS', termId: 1 } });
    await client.discipline.upsert({ where: { name: 'JavaScript' }, update: { termId: 2 }, create: { name: 'JavaScript', termId: 2 } });
    await client.discipline.upsert({ where: { name: 'React' }, update: { termId: 3 }, create: { name: 'React', termId: 3 } });
    await client.discipline.upsert({ where: { name: 'Humildade' }, update: { termId: 1 }, create: { name: 'Humildade', termId: 1 } });
    await client.discipline.upsert({ where: { name: 'Planejamento' }, update: { termId: 2 }, create: { name: 'Planejamento', termId: 2 } });
    await client.discipline.upsert({
        where: { name: 'Autoconfiança' },
        update: { termId: 3 },
        create: { name: 'Autoconfiança', termId: 3 },
    });

    await client.discipline.update({
        where: { name: 'HTML e CSS' },
        data: { categories: { connect: [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }] } },
    });
    await client.discipline.update({
        where: { name: 'JavaScript' },
        data: { categories: { connect: [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }] } },
    });
    await client.discipline.update({
        where: { name: 'React' },
        data: { categories: { connect: [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }] } },
    });
    await client.discipline.update({
        where: { name: 'Humildade' },
        data: { categories: { connect: [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }] } },
    });
    await client.discipline.update({
        where: { name: 'Planejamento' },
        data: { categories: { connect: [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }] } },
    });
    await client.discipline.update({
        where: { name: 'Autoconfiança' },
        data: { categories: { connect: [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }] } },
    });

    await client.teacher.upsert({ where: { name: 'Diego Pinho' }, update: {}, create: { name: 'Diego Pinho' } });
    await client.teacher.upsert({ where: { name: 'Bruna Hamori' }, update: {}, create: { name: 'Bruna Hamori' } });

    await client.teacher.update({
        where: { name: 'Diego Pinho' },
        data: {
            disciplines: { connect: [{ name: 'HTML e CSS' }, { name: 'JavaScript' }, { name: 'React' }] },
            categories: { connect: [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }] },
        },
    });
    await client.teacher.update({
        where: { name: 'Diego Pinho' },
        data: {
            disciplines: { connect: [{ name: 'Humildade' }, { name: 'Planejamento' }, { name: 'Autoconfiança' }] },
            categories: { connect: [{ name: 'Projeto' }, { name: 'Prática' }, { name: 'Recuperação' }] },
        },
    });

    await client.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 1, disciplineId: 1 } },
        update: {},
        create: { teacherId: 1, disciplineId: 1 },
    });
    await client.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 1, disciplineId: 2 } },
        update: {},
        create: { teacherId: 1, disciplineId: 2 },
    });
    await client.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 1, disciplineId: 3 } },
        update: {},
        create: { teacherId: 1, disciplineId: 3 },
    });
    await client.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 2, disciplineId: 4 } },
        update: {},
        create: { teacherId: 2, disciplineId: 4 },
    });
    await client.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 2, disciplineId: 5 } },
        update: {},
        create: { teacherId: 2, disciplineId: 5 },
    });
    await client.teacherDiscipline.upsert({
        where: { teacherId_disciplineId: { teacherId: 2, disciplineId: 6 } },
        update: {},
        create: { teacherId: 2, disciplineId: 6 },
    });
}

main()
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
    .finally(() => client.$disconnect());
