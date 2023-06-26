# file_manager



# usage

start with =
npm run start -- --username=[your username]

or

npm start -- --username=[your username]

Note: there should not be any space between --username and = and [your username]

-------------------------------------------------------------------

ls = shows all files and directories on current directory

-------------------------------------------------------------------

cd = use this command switch from directory to another directory 

for example =      cd /home/user/Downloads

now you are in Downloads folder which located in user directory

-------------------------------------------------------------------

cat = reads all files in console 

for example = cat /home/user/hello.txt

if you are in user directory just type 

cat hello.txt

-------------------------------------------------------------------

up = goes up from current directory

for example =   
if you are in user directory by typing up you can locate one
step upper directory in our example ot will be /home directory

-------------------------------------------------------------------

add = creates new file on current directory

for example = add newFile.txt 

now it creates newFile.txt in current directory


-------------------------------------------------------------------


rn = renames filename 

for example = rn /home/user/example.txt newName.txt


now it renames example.txt which is in user directory into newName.txt


Note: do not forget to pass the path to file while renaming.

-------------------------------------------------------------------

cp = copies files 

for example = cp /home/user/example.txt /home/user/Downloads

now it copies example.txt file to Downloads folder 

we should pass path to file while copying.

-------------------------------------------------------------------

mv = moves files from one folder to another folder. 


for example = mv /home/user/example.txt /home/user/Downloads

it moves example.txt from uset directory to Downloads

-------------------------------------------------------------------


rm = deletes file. 


for example = rm /homme/user/Downloads/example.txt 

if you are in Downloads folder just type 

"rm example.txt" 

------------------------------------------------------------------

os --EOL = GETS End-Of-LINE



------------------------------------------------------------------

os --cpus = gets CPUs information 


------------------------------------------------------------------

os --homedir = gets home directory and prints to the console

------------------------------------------------------------------

os --username = gets username of current system ands prints to the console

------------------------------------------------------------------

os --architecture = gets CPUs architecture and prints to the console

------------------------------------------------------------------

hash = calculates hash of file and prints to console

for example = 

hash /home/user/example.txt

------------------------------------------------------------------

compress = compresses files using Brotli algorithm.

for example = 

compress /home/user/example.txt /home/user/Downloads

it compress example.txt from user directory to Downloads directory 

------------------------------------------------------------------

decompress = decompresses files using Brotli algorithm.

usage same with compress function







