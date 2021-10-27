import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

export const StyledNumberInput = styled.input.attrs((props) => ({
  type: 'number',
  min: 1,
  max: 10,
  defaultValue: props.value,
}))`
border-radius: 50px;
border: none;
background-color: #999000;
padding: 5px;
font-weight: bold;
color: #000000;
width: 50px;
cursor: ;
box-shadow: 2px 8px 4px -2px rgba(250, 250, 0, 0.5);
-webkit-box-shadow: 2px 3px 10px -2px rgba(0, 0, 0, 0.5);
-moz-box-shadow: 2px 8px 4px -2px rgba(250, 250, 0, 0.5);
:active {
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
}`;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #000000;
  padding: 10px;
  font-weight: bold;
  color: #ffffff;
  width: 300px;
  cursor: pointer;
  box-shadow: 2px 8px 4px -2px rgba(250, 250, 0, 0.5);
  -webkit-box-shadow: 2px 3px 10px -2px rgba(250, 250, 0, 1.0);
  -moz-box-shadow: 2px 8px 4px -2px rgba(250, 250, 0, 0.5);
  :active {
    box-shadow: none;
    -webkit-box-shadow: 2px 3px 10px -2px rgba(250, 250, 0, 1.0);
    -moz-box-shadow: none;
  }
  :hover {
    -webkit-box-shadow: 2px 3px 20px -2px rgba(100, 0, 250, 0.9);
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: ;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: column;
  }
`;

export const StyledImg1 = styled.img`
height: 0px;
center
position: fixed;
  margin-bottom: 0px;
  margin-top: 160px;
  @media (min-width: 767px) {
    width: 1100px;
    height: 360px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg3 = styled.img`
  width: 300px;
  height: 300px;
  @media (min-width: 767px) {
    width: 300px;
    height: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg4 = styled.img`
border-radius: 50px;
color: #ffffff;
cursor: pointer;
box-shadow: 2px 8px 4px -2px rgba(100, 0, 250, 0.5);
-webkit-box-shadow: 2px 3px 10px -2px rgba(100, 0, 250, 1.0);
-moz-box-shadow: 2px 8px 4px -2px rgba(100, 0, 250, 0.5);
:active {
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
}
:hover {
  -webkit-box-shadow: 2px 3px 20px -2px rgba(250, 250, 0, 0.9);
}
`;

export const Gallery = styled.div`
  height: 0px;
  position: fixed;
  margin-bottom: 0px;

  .photobanner {
    position: fixed;
    top: 0px;
    right: 0px;
    overflow: hidden;
    white-space: nowrap;
    animation: bannermove 60s linear infinite alternate;

    &:hover {
      animation-play-state: ;
    }
  }

  .photobanner img {
    height: 175px;
    margin: 0 .0em;
  }

  @keyframes bannermove {
    70% {
      transform: translate( -50%, 0);
    }
    70% {
      transform: translate( 50%, 0);
    }
  }
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState(" 1 NFT = .0001 ETH");
  const [claimingNft, setClaimingNft] = useState(false);
  const [mintQuantity, setMintQuantity] = useState(1)

  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("...");
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(_amount)
      .send({
        gasLimit: "285000",
        to: "0x969554884af1081E61B96fd6Fa1d1f7b897b0bD8",
        from: blockchain.account,
        value: blockchain.web3.utils.toWei((.0001 * _amount).toString(), "ether"),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Try Again");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "Success!"
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen style={{ backgroundColor: "var(--black)" }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 20 }}>
        <s.TextTitle
          style={{ textAlign: "center", fontSize: 42, fontWeight: "bold" }}
        >
          
        </s.TextTitle>
        <ResponsiveWrapper flex={10} style={{ padding: 0 }}>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <s.TextTitle
              style={{ textAlign: "center", fontfamily: "Montserrat-Bold", fontSize: 26, fontWeight: "bold" }}
            >
              {data.totalSupply}/10000
              <s.SpacerSmall/>
            </s.TextTitle>
          </s.Container>
          <s.Container
            flex={10}
            jc={"center"}
            ai={"center"}
            style={{ backgroundColor: "#000000", padding: 2 }}
          >
            {Number(data.totalSupply) == 10000 ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                SOLD OUT!
                </s.TextTitle>
                <s.SpacerMedium />
                <s.TextDescription style={{ textAlign: "center" }}>
                  Please visit OpenSea to buy: {" "}
                  <a
                    target={""}
                    href={"https://opensea.io/collection/the-bee-collaborative"}
                  >
                    Zombie Chickens
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
                <s.TextDescription style={{ textAlign: "center" }}>
                  {feedback}
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT WALLET
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.TextDescription style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledNumberInput 
                    value={mintQuantity}
                      onChange={(e) => setMintQuantity(e.target.value) }
                    />
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(mintQuantity);
                        getData();
                      }}
                    >
                      {claimingNft ? "..." : `MINT`}
                    </StyledButton>
                  </s.Container>
                )}
              </>
            )}
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerSmall />
        <s.TextDescription style={{ textAlign: "center", fontSize: 20 }}>
                   <s.TextDescription style={{ textAlign: "center", fontSize: 16 }}>
                   {" "}
                </s.TextDescription>
          {/* <button 
  onClick={() =>  navigator.clipboard.writeText('https://etherscan.io/token/0x969554884af1081E61B96fd6Fa1d1f7b897b0bD8')}
>
Click to Copy Etherscan Address | Buy Straight from Contract
</button> */}
          </s.TextDescription>
          <s.SpacerSmall />
          {/* <s.TextDescription style={{ textAlign: "center" }}>
                  {" "}
                  <a
                    target={""}
                    href={"https://t.me/TBCToken"}
                  >
                    Telegram
                  </a>
                </s.TextDescription>
                <s.TextDescription style={{ textAlign: "center" }}>
                   {" "}
                  <a
                    target={""}
                    href={"https://discord.gg/Rx2b4JTxJr"}
                  >
                    Discord
                  </a>
                </s.TextDescription> */}
        <s.Container jc={"top"} ai={"center"} style={{ width: "70%" }}>
        <s.SpacerLarge />
        </s.Container>
      </s.Container>
  </s.Screen>
  );
}

export default App;
