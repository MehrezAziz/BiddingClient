export default function BiddingInfo(){
    return (
        <div className="infosBidding">    
            <div id="germanBidding">
                <h2>
                German Bidding:
                </h2>
                <ul>
                    <li>
                    <span className="tileInBiddingInfo"> Structured Bidding:</span> We use a clear system where bids start at a minimum price set by the seller. Each bid must follow specific rules, like increasing by a certain amount each time.
                    </li>
                    <li>
                    <span className="tileInBiddingInfo">Minimum Price:</span> Sellers set a minimum price they're willing to accept for their car. Bids below this aren't accepted.
                    </li>
                </ul>
            </div>
            <div id="dutchBidding">
                <h2>
                    Dutch Bidding:
                </h2>
                <ul>
                    <li>
                    <span className="tileInBiddingInfo"> Price Drop:</span>The starting price for each car decreases over time or with each bid.
                    </li>
                    <li>
                    <span className="tileInBiddingInfo">Time Limit:</span>  Each auction has a set time. As time goes on, the price drops until someone buys it or the auction ends.
                    </li>
                </ul>

            </div>
        </div>
    );
}