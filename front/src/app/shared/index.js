import Button from "./components/button/button";
import Header from "./components/header/header";
import Page from "./components/page/page";
import Popup from "./components/popup/popup";
import TextField from "./components/text-field/text-field";
import FieldWrapper from "./components/form/field-wrapper/field-wrapper";
import Radio from "./components/radio/radio";
import { TabNav, TabContent } from "./components/tabs";
import IconWrapper from "./components/icon-wrapper/icon-wrapper";

import { ReactComponent as EditIcon } from "./assets/edit.svg";
import { ReactComponent as AddIcon } from "./assets/plus.svg";
import { ReactComponent as TrashIcon } from "./assets/trash.svg";

import usePopup from "./custom-hook/use-popup";
import useTab from "./custom-hook/use-tab";

import TextInput from "./components/form/text-input/text-input";
import {
  checkFormError, composeValidator, isNotUndefined, isTruthy, maxLength, formatAmount,
} from "./utils";

export {
  Button,
  Header,
  Page,
  Popup,
  TextField,
  FieldWrapper,
  IconWrapper,
  Radio,
  TabNav,
  TabContent,
  EditIcon,
  AddIcon,
  TrashIcon,
  usePopup,
  useTab,
  TextInput,
  checkFormError, composeValidator, isNotUndefined, isTruthy, maxLength, formatAmount,
};
