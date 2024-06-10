import axios from 'axios';
import { RoleDto } from '../dto/role-auth.dtos';
import { ROLE } from 'src/constants/constants';
export const getAccessTokenRealms = async () => {
  const formData = new URLSearchParams();
  formData.append('grant_type', 'password');
  formData.append('client_id', process.env.CLIENT_ID_KEYCLOCK);
  formData.append('username', process.env.USER_NAME_KEYCLOCK);
  formData.append('password', process.env.PASSWORDS_KEYCLOCK);

  try {
    const data = await axios.post(
      `https://internship-id.zodinet.tech/realms/master/protocol/openid-connect/token`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return data.data;
  } catch (error) {
    return error.message;
  }
};
export const signUpKeyClock = async (signUpInfo, accessToken) => {
  try {
    const data = await axios.post(
      `https://internship-id.zodinet.tech/admin/realms/Booking/users`,
      signUpInfo,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return data.data;
  } catch (error) {
    return error.response.data.errorMessage;
  }
};

export const getUserIdKeyClock = async (email, accessToken) => {
  try {
    const data = await axios.get(
      `https://internship-id.zodinet.tech/admin/realms/Booking/users?email=${email}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return data.data;
  } catch (error) {
    return error.message;
  }
};
export const getRoleIdKeyClock = async (
  accessToken: string,
  role: ROLE,
): Promise<RoleDto> => {
  try {
    const data = await axios.get(
      `https://internship-id.zodinet.tech/admin/realms/Booking/clients/${process.env.CLIENT_ID_UIID_KEYCLOAK}/roles/${role}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return data.data;
  } catch (error) {
    return error.message;
  }
};

export const createRoleUserKeyClock = async (userId, accessToken, dataBody) => {
  try {
    const data = await axios.post(
      `https://internship-id.zodinet.tech/admin/realms/Booking/users/${userId}/role-mappings/clients/${process.env.CLIENT_ID_UIID_KEYCLOAK}`,
      dataBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return data.data;
  } catch (error) {
    return error.message;
  }
};
