create database banking;

use banking;

create table banking.empolyee(
	
    employee_id int primary key,
	emp_role varchar(40),
    f_name varchar(30),    
    m_name varchar(30),
    l_name varchar(30),
	branch_no int references branch(branch_no)
	-- this is a comment
 
);
create table banking.branch(
	
    branch_no int primary key,
    branch_name varchar(30),    
    location varchar(50)

);



create table banking.customer(

	customer_id int primary key,
    f_name varchar(30),    
    m_name varchar(30),
    l_name varchar(30),
	 credit_score int,
	address varchar(100),
    contact_number int


);

ALTER TABLE customer
MODIFY customer_id INT AUTO_INCREMENT;
create table banking.loan(

	loan_no int primary key,
    customer_id int references customer(customer_id) ,    
    amount int not null,
    collateral varchar(30),
	interest float not null,
   time_months int not null


);
create table banking.account(

	account_no int primary key,
    customer_id int references customer(customer_id) ,    
    balance int not null,
    acc_type varchar(30),
	interest_rate float not null
    
);
create table banking.card(

	card_no int primary key,
    customer_id int references customer(customer_id) ,    
    acc_no int references account(account_no),
    card_type varchar(30)
    
);
create table banking.transactions(

	transaction_no int primary key,
    acc_from int references account(account_no),
    acc_to int references account(account_no),
    transaction_date date,
    amount int NOT NULL,
    trans_type varchar(40)
    
);


select * from customer