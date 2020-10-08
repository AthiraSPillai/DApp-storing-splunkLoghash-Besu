pragma solidity >=0.4.22 <0.8.0;

contract HashFile{

    struct Cert {
        address recipient;
        bool confirmed;
    }

    mapping(bytes32 => Cert) public certs;
    bytes32[] public certList;

    event LogNewCert(address sender, bytes32 cert);
    event LogConfirmed(address sender, bytes32 cert);

    function isCert(bytes32 cert) public view returns(bool isIndeed) {
        if(cert == 0) return false;
        return certs[cert].recipient == msg.sender;
    }

    function createCert(bytes32 cert) public {
        require(!isCert(cert));
        Cert storage c = certs[cert];
        c.recipient = msg.sender;
        certList.push(cert);
        emit LogNewCert(msg.sender, cert);
    }

    function confirmCert(bytes32 cert) public {
        require(certs[cert].confirmed == false);
        certs[cert].confirmed = true;
        emit LogConfirmed(msg.sender, cert);
    }

    function isUserCert(bytes32 cert, address user) public view returns(bool) {
        if(!isCert(cert)) return false;
        return certs[cert].confirmed;
    }
}