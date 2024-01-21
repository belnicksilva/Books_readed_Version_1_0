create table booklist1(
    id serial PRIMARY KEY,
    nome VARCHAR(50) not null,
    rate int  not null,
    resume text not null,
    data date not null,
    isbn varchar(20) not null
);

alter table booklist drop column isbn;
ALTER TABLE booklist ADD isbn VARCHAR(20);
ALTER TABLE booklist delete id=2;

DROP TABLE booklist;