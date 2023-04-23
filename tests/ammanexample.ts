import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Ammanexample } from "../target/types/ammanexample";
import { Amman, LOCALHOST } from "@metaplex-foundation/amman-client";
import { coder } from "@coral-xyz/anchor/dist/cjs/native/system";

/*
bob -2 
alice -1 

token account 1 
bob-2

Web3 + solana course:
Buildspace - Solana Core 
Buildspace.so

Rust course:
Coding and Crypto 
*/

describe("ammanexample", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Ammanexample as Program<Ammanexample>;

  const amman = Amman.instance();

  let alice: anchor.web3.Keypair;
  let bob: anchor.web3.Keypair;

  before(async () => {
    let aliceAmman = await amman.genLabeledKeypair("Alice");
    let bobAmman = await amman.genLabeledKeypair("Bob");

    alice = aliceAmman[1];
    bob = bobAmman[1];

    // Airdrop 1 SOL to Alice
    await amman.airdrop(program.provider.connection, alice.publicKey, 1);
    // Airdrop 1 SOL to Bob
    await amman.airdrop(program.provider.connection, bob.publicKey, 1);
  });

  const token: anchor.web3.Keypair = anchor.web3.Keypair.generate();

  it("Mint Tokens to Alice", async () => {
    const associatedTokenAccountAlice =
      await anchor.utils.token.associatedAddress({
        mint: token.publicKey,
        owner: alice.publicKey,
      });
    const tx = await program.methods
      .mint(new anchor.BN(100 * 10 ** 9))
      .accounts({
        mintAccount: token.publicKey,
        mintAuthority: alice.publicKey,
        payer: alice.publicKey,
        toAssociatedTokenAccount: associatedTokenAccountAlice,
      })
      .signers([alice, token])
      .rpc();
    console.log("Your transaction signature", tx);
  });

  it("Send Tokens from Alice to Bob", async () => {
    const associatedTokenAccountAlice =
      await anchor.utils.token.associatedAddress({
        mint: token.publicKey,
        owner: alice.publicKey,
      });
    const associatedTokenAccountBob =
      await anchor.utils.token.associatedAddress({
        mint: token.publicKey,
        owner: bob.publicKey,
      });
    const tx = await program.methods
      .transfer(new anchor.BN(100 * 10 ** 9))
      .accounts({
        mintAccount: token.publicKey,
        recipient: bob.publicKey,
        owner: alice.publicKey,
        payer: alice.publicKey,
        fromAssociatedTokenAccount: associatedTokenAccountAlice,
        toAssociatedTokenAccount: associatedTokenAccountBob,
      })
      .signers([alice])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
