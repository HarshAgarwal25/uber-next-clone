import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import { useRouter } from "next/router";
import RideSelector from "./components/RideSelector";
import Link from "next/link";

const Confirm = () => {
  const router = useRouter();
  const { pickup, dropoff } = router.query;
  const [pickupCoordinates, setPickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setDropoffCoordinates] = useState([0, 0]);

  const getPickupCoordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          //?access_token
          access_token:
            "pk.eyJ1IjoiaGFyc2hhZ2Fyd2FsMjUiLCJhIjoiY2t3M2Z4aHNhMGFsdDJwcHhxNDg5bjBqMiJ9.fHcPQ6954PZf1Aw5CaB-vQ",
          limit: 1,
        })
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPickupCoordinates(data.features[0].center);
      });
  };
  const getDropoffCoordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoiaGFyc2hhZ2Fyd2FsMjUiLCJhIjoiY2t3M2Z4aHNhMGFsdDJwcHhxNDg5bjBqMiJ9.fHcPQ6954PZf1Aw5CaB-vQ",
          limit: 1,
        })
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDropoffCoordinates(data.features[0].center);
      });
  };
  useEffect(() => {
    getPickupCoordinates(pickup);
    getDropoffCoordinates(dropoff);
  }, [pickup, dropoff]);

  return (
    <Wrapper>
      <ButtonCont>
        <Link href="/search">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonCont>
      <Map
        pickupCoordinates={pickupCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />
      <RideCont>
        <RideSelector
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
        />
        <ConfirmButton>Confirm Uber</ConfirmButton>
      </RideCont>
    </Wrapper>
  );
};

export default Confirm;
const Wrapper = tw.div`flex h-screen flex-col`;
const RideCont = tw.div`flex-1 flex flex-col h-1/2`;
const ConfirmButton = tw.div`bg-black m-2 mx-4 text-white text-center px-4 py-3 text-xl cursor-pointer`;
const ButtonCont = tw.div`rounded-full absolute top-4 left-4 z-10 bg-white shadow-md`;
const BackButton = tw.img`h-12 cursor-pointer`;
