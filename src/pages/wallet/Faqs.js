import React from "react";

const Faqs = () => {
  return (
    <div>
      <div className="text-white m-5">
        <h1 className="uppercase text-center text-4xl font-bold">Basics</h1>
        <hr className="m-4"></hr>
        <div className="">
          <h3 className="text-2xl font-bold uppercase">What is Vutapesa?</h3>
          <p>
            vutapesa is an online multiplayer game with a great player
            experience. It's fun and thrilling. It can also make you millions.
          </p>
          <p>
            Each round of the game, you have the opportunity to place a bet
            before the round starts. Once the round begins, a lucky multiplier
            starts at 1x and begins climbing higher and higher.
          </p>
          <p>
            At any moment, you can click <strong>"Cashout"</strong> to lock in
            the current multiplier which awards you with your multiplied bet.
          </p>
          <p>
            The longer you stay in the game before cashing out, the higher the
            multiplier gets. But beware! Every tick of the game has a chance of
            busting. If you do not cash out before the bust, you lose your bet.
          </p>
          <p>
            Every round is a fight between risk and reward. Do you cash out at
            1.1x for a conservative win? Or do you stay in the game to hunt the
            high 1000x multipliers?
          </p>
          <p>
            vutapesa is&nbsp; provably fair &nbsp; and has one of the lowest
            house edges in the market, of only 1%.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold uppercase">
            How do I play vutapesa?
          </h3>
          <p>
            First you need to have a positive balance, by depositing money
            through MPESA to your account or receiving a tip from someone in the
            community.
          </p>
          <p>
            Next, select the amount to bet and a cash out multiplier. Place your
            bet. Watch the multiplier increase from 1x upwards! You can cash out
            before your set up cash out limit, pressing the
            <strong>'Cash Out'</strong> button. Get your bet multiplied by that
            multiplier. But be careful because the game can bust at any time,
            and you'll get nothing!
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold uppercase">
            Is vutapesa a fair game?
          </h3>
          <p>Absolutely! And we can prove it.</p>
          <p>
            There are already 3rd party open source scripts to verify and
            calculate the game results. Check out this&nbsp;
            {/* <a
              href="https://jsfiddle.net/Code254/6x57284r"
              target="_blank"
              rel="noopener noreferrer"
              className="css-xpfu8h"
            > */}
            handy tool
            {/* </a> */}
            &nbsp;that one of our players generously made.
          </p>
          <p>
            Learn more about our &nbsp;
            {/* <a
              href="https://www.vutapesa.com/provably-fair.html"
              target="_blank"
              rel="noopener noreferrer"
              className="css-xpfu8h"
            > */}
            provably fair system
            {/* </a> */}
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold uppercase">
            How high can the game go?
          </h3>
          <p>There's no real limit!</p>
        </div>
      </div>
      <div className="text-white m-5">
        <h1 className="text-4xl font-bold uppercase text-center">
          Affiliate Program
        </h1>
        <hr className="m-4"></hr>
        <div>
          <h3 className="text-2xl font-bold uppercase">
            What is vutapesa Affiliate Program
          </h3>
          <p>
            vutapesa Affiliates is a program where we give you the opportunity
            to earn money every month simply by giving us the chance to welcome
            more players through our virtual doors.
          </p>
        </div>
        <div>
          <h3>HOW MUCH DOES IT COST TO JOIN?</h3>
          <p>Absolutely nothing. It's 100% free.</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold uppercase">
            CAN I STILL BENEFIT IF I DON'T HAVE A WEBSITE?
          </h3>
          <p>
            Of course you can. We can give you all the marketing tools you will
            need to promote vutapesa offline, on social media or by email.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold uppercase">How much do I earn?</h3>
          <p>
            As part of our affiliate network, you will be paid in a revenue
            share based model. You earn a 30% commission on revenues made.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold uppercase">
            What is negative revenue?
          </h3>
          <p>
            Negative commission happens when an affiliate’s players generate
            negative revenue for vutapesa. The house periodically absorbs all
            negative commissions and allows an affiliate to earn positive
            commissions on earnings from the subsequent games without having to
            “pay back” the sportsbook’s loss.
          </p>
          <p>Note: Negative commissions will NEVER impact your balance.</p>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
