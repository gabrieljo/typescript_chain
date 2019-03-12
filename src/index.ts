import * as CryptJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructor = (currentBlock: Block): boolean =>
    typeof currentBlock.index === "number" &&
    typeof currentBlock.hash === "string" &&
    typeof currentBlock.previousHash === "string" &&
    typeof currentBlock.timestamp === "number" &&
    typeof currentBlock.data === "string";

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.data = data;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(
  0,
  "#@AQSEDFASDFQWE!@#$",
  "",
  "hello",
  123456
);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const nextTimestamp: number = getNewTimeStamp();
  const nextHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    nextTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    nextHash,
    previousBlock.hash,
    data,
    nextTimestamp
  );

  addBlock(newBlock);

  return newBlock;
};

const getHashforBlock = (currentBlock: Block): string =>
  Block.calculateBlockHash(
    currentBlock.index,
    currentBlock.previousHash,
    currentBlock.timestamp,
    currentBlock.data
  );

const isBlockValid = (currentBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructor(currentBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== currentBlock.index) {
    return false;
  } else if (previousBlock.hash !== currentBlock.previousHash) {
    return false;
  } else if (getHashforBlock(currentBlock) !== currentBlock.hash) {
    return false;
  }
  return true;
};

const addBlock = (currentBlock: Block): void => {
  if (isBlockValid(currentBlock, getLatestBlock())) {
    blockchain.push(currentBlock);
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
createNewBlock("fifth block");

console.log(blockchain);
