import { User, onAuthStateChanged } from 'firebase/auth';
import { getDownloadURL, ref } from 'firebase/storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { storage } from '../api/firebase/firebaseConfig';
import { AccountEntity } from '../api/models/entities/AccountEntity/AccountEntity';
import { CartService } from '../api/services/cartService';
import { useSpinner } from '../hooks';

export type LoginContextState = {
  login: {
    isUserSignedIn?: boolean;
    user?: AccountEntity;
    handleLogin: (isUserSignedIn?: boolean, user?: AccountEntity) => void;
    avatar?: string;
  };
  cart: {
    cartCount?: number;
  };
};

export const SampleAccount: { username: string; account: AccountEntity }[] = [
  {
    username: 'taikhoan21@gmail.com',
    account: {
      uid: '7uTFYivGN7RMUTtACd70J82ZTlT2',
      name: 'Lý Văn Bình',
      avatar: 'Avatar/ly-van-binh.jpg',
      introduction:
        'Tôi là Lý Văn Bình, người nấu ăn với niềm đam mê sâu sắc và tin rằng mỗi bữa ăn là một tác phẩm nghệ thuật.',
      link: 'www.lyvanbinhartistry.com',
      slogan: 'Đầu bếp sáng tạo',
      quote: 'Gia vị là bí mật tạo nên hương vị không thể quên.',
      isDeleted: false,
    },
  },
  {
    username: 'taikhoan03@gmail.com',
    account: {
      uid: 'Txw1cyNFazdogIMR9qdrVEqHHVP2',
      name: 'Huỳnh Thị Thu Thảo',
      avatar: 'Avatar/huynh-thi-thu-thao.jpg',
      introduction:
        'Huỳnh Thị Thu Thảo đây! Tôi yêu thích nấu ăn và luôn cố gắng biến mỗi bữa ăn thành một tác phẩm nghệ thuật.',
      link: 'www.huynhthuthuthao.com',
      slogan: 'Đầu bếp chuyên nghiệp',
      quote: 'Nấu ăn là cách tốt nhất để thư giãn và tự thưởng thức cuộc sống.',
      isDeleted: false,
    },
  },
];

const LoginContext = createContext<LoginContextState>({
  login: {
    isUserSignedIn: undefined,
    user: undefined,
    handleLogin: () => {},
    avatar: undefined,
  },
  cart: {
    cartCount: 0,
  },
});
export const useLoginContext = () => {
  const [login, setLogin] = useState<{
    isUserSignedIn?: boolean;
    user?: AccountEntity;
  }>({});

  const handleLogin = useCallback(
    (isUserSignedIn?: boolean, user?: AccountEntity) => {
      setLogin({ isUserSignedIn: isUserSignedIn, user: user });
    },
    []
  );

  const [cartCount, setCartCount] = useState(0);

  const [image, setImage] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!login.user) {
        return;
      }
      if (login.user.avatar) {
        const data = await getDownloadURL(ref(storage, login.user.avatar));
        setImage(data);
      }
      const carts = await CartService.GetCartByAccountId(login.user.uid);
      setCartCount(carts.length);
    }
    fetchData();
  }, [login]);

  return {
    login: {
      isUserSignedIn: login.isUserSignedIn,
      user: login.user,
      handleLogin: handleLogin,
      avatar: image,
    },
    cart: {
      cartCount: cartCount,
    },
  };
};

export default LoginContext;
