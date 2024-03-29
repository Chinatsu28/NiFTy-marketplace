# Team members:
1. Tuan Hung Lo - ID: 103842425
2. Chi Duc Luong - ID: 104181721
3. Thanh An Ho - ID: 104177364
4. Tran Bao Kien Le - ID: 104223584

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Installing
1. **Clone the Repo**
    ```bash
    git clone <repo-url>
2. **Navigate to project directory**
    ```bash
    cd <proj-directory>

## Running the Project
After installing the dependencies, start the development server:
- Open the folder in terminal and run the commands below in order to connect to the AWS server:
    ```bash
    ssh -i "cos30049.pem" ubuntu@ec2-52-51-145-147.eu-west-1.compute.amazonaws.com

    sudo -s

    cd ../../

    cd /opt/ethPoA/node0

    geth --networkid 9999 --datadir ./data --port 30303 --ipcdisable --syncmode full --http --allow-insecure-unlock --http.corsdomain "*" --http.port 8545 --http.addr "172.31.25.14" --unlock 0x061E17F6191e596863244cd33076E45663fe0dd1 --password ./password.txt --mine --http.api personal,admin,db,eth,net,web3,miner,shh,txpool,debug,clique --ws --ws.addr 0.0.0.0 --ws.port 8546 --ws.origins '*' --ws.api personal,admin,db,eth,net,web3,miner,shh,txpool,debug,clique --maxpeers 25 --miner.etherbase 0x061E17F6191e596863244cd33076E45663fe0dd1 --miner.gasprice 0 --miner.gaslimit 9999999

- Open folder in Visual Studio Code
- Run server in the terminal:
    ```bash
    cd server

    npm install

    npm start

- At the same time, open a new terminal to run the client:
    ```bash
    cd server

    npm install

    npm run dev