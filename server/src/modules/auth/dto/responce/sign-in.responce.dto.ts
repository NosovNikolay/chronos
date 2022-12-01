export class SignInResponseDto {
  token: string;

  public static mapFrom(token: string): SignInResponseDto {
    return {
      token: token,
    };
  }
}
