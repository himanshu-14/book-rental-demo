select * from transactions;

delete from transactions where trans_id in (8,9);

select * from books;
select * from book_copies where book_copy_id = '1'

UPDATE book_copies SET book_copy_status = 0 where book_copy_id = 1;
select * from customers;

UPDATE customers SET num_rented = 1 where cust_id = 1;

select * from transactions tr, book_copies bc where trans_book_copy_id=book_copy_id;
select * from transactions tr INNER JOIN book_copies bc ON trans_book_copy_id=book_copy_id;

update transactions set trans_status=0,charges=5 where trans_book_copy_id=1;


select * from transactions;
select * from book_copies;
select * from customers;

UPDATE transactions SET trans_status=1 ,return_date=NULL,charges=NULL WHERE trans_book_copy_id=1  RETURNING *;

select * from customers cust INNER JOIN (select trans_cust_id,count(*) from transactions where trans_status=1 group by trans_cust_id) dust on cust.cust_id=dust.trans_cust_id;

select * from transactions,book_copies where trans_book_copy_id=book_copy_id and trans_status=1;

UPDATE customers SET num_rented=num_rented+1 where cust_id = 2;