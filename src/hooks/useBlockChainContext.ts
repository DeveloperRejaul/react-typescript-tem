import { useContext } from "react";
import { EtherContext } from "../context/BlockChainContext";
export const useBlockChainContext = ()=> useContext(EtherContext) 