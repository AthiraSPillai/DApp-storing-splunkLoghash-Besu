pragma solidity >=0.4.22 <0.8.0;

contract HashFile{

    struct Hash {
        address fileowner;
        bool confirmed;
    }

    mapping(bytes32 => Hash) public hashes;
    bytes32[] public hashList;

    event LogNewHash(address sender, bytes32 hashes);

    function isHash(bytes32 hash) public view returns(bool isIndeed) {
        if(hash == 0) return false;
        return hashes[hash].fileowner == msg.sender;
    }

    function createHash(bytes32 hash) public {
        require(!isHash(hash));
        Hash storage h= hashes[hash];
        h.fileowner = msg.sender;
        hashList.push(hash);
        hashes[hash].confirmed = true;
        emit LogNewHash(msg.sender, hash);
    }

  

    function isOwnerHash(bytes32 hash, address owner) public view returns(bool) {
        if(!isHash(hash)) return false;
        return hashes[hash].confirmed;
    }
}