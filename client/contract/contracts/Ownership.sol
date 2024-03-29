pragma solidity 0.5.16;
// pragma experimental ABIEncoderV2;

import "./ERC721Full.sol";

contract Ownership is ERC721Full {
    enum State {
        Purchased,
        OnSale
    }

    mapping(uint => address) public usermap;
    mapping(address => uint) public addressmap;

    struct ProductOwn {
        uint256 ID;
        uint UID;
        uint PID;
        uint Batch;
        uint BatchID;
        uint price;
        uint time;
        State state;
    }

    ProductOwn[] public Ownerships;
    mapping(uint => ProductOwn[]) OwnershipsBatch;
    uint public totalBatch;
    // mapping
    mapping(uint => ProductOwn[]) OwnershipByBatch;
    mapping(uint => uint[]) OwnershipByUser;
    mapping(uint => uint[]) OwnerByProduct;
    mapping(uint => mapping(uint => bool)) OwnerCheck;
    mapping(uint => mapping(uint => mapping(uint => ProductOwn))) OwnerSearch;

    constructor() public ERC721Full("Ownership", "OWNERSHIP") {
        totalBatch = 0;
    }

    // function getPrice() public view returns(uint256) {
    //   return price;
    // }

    function mint(
        uint _productID,
        uint _userID,
        uint _batch,
        uint _batchID,
        uint _price
    ) public {
        // bytes32 hashed = HashCourse(_course);
        // require(!OwnerCheck[_productID][_userID]);
        uint _id = Ownerships.length;
        Ownerships.push(
            ProductOwn({
                ID: _id,
                UID: _userID,
                PID: _productID,
                Batch: _batch,
                BatchID: _batchID,
                price: _price,
                time: 0,
                state: State.OnSale
            })
        );

        _mint(msg.sender, _id);
        OwnerSearch[_productID][_batch][_batchID] = Ownerships[
            Ownerships.length - 1
        ];
        OwnershipByUser[_userID].push(_id);
        OwnerByProduct[_productID].push(_userID);
        OwnershipsBatch[_batch].push(Ownerships[Ownerships.length - 1]);
    }

    function batch_mint(uint batch_size, uint _productID, uint _price) public {
        totalBatch = totalBatch + 1;

        for (uint i = 0; i < batch_size; ++i) {
            mint(_productID, 0, totalBatch, i, _price);
        }
    }

    function getOwnershipByUser(uint UID) public view returns (uint[] memory) {
        return OwnershipByUser[UID];
    }

    function getTotalOwnedProduct(uint UID) public view returns (uint) {
        return OwnershipByUser[UID].length;
    }

    function createUser(uint UID, address uad) public {
        usermap[UID] = uad;
        addressmap[uad] = UID;
    }

    function getOwnerByProduct(uint PID) public view returns (uint[] memory) {
        return OwnerByProduct[PID];
    }

    function update(uint _userID, uint id) public payable {
        Ownerships[id].UID = _userID;
        Ownerships[id].state = State.Purchased;
        Ownerships[id].time = now;
        OwnershipByUser[_userID].push(id);
        OwnerByProduct[id].push(_userID);
    }

    function addUser(uint _userID, address userAddress) public {
        usermap[_userID] = userAddress;
    }

    function burn(uint _tokenId) public {
        require(_isApprovedOrOwner(msg.sender, _tokenId));
        _burn(ownerOf(_tokenId), _tokenId);
    }
}
