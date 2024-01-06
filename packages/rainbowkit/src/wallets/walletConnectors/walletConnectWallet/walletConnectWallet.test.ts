import { describe, expect, expectTypeOf, it } from 'vitest';
import { mainnet } from 'wagmi/chains';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { walletConnectWallet } from './walletConnectWallet';

describe('walletConnectWallet', () => {
  const chains = [mainnet];
  const projectId = 'test-project-id';

  it('without projectId', () => {
    // @ts-ignore - intentionally missing projectId for v2 default
    const wallet = walletConnectWallet({ chains });
    expect(() => wallet.createConnector()).toThrowError();
  });

  it('with projectId', () => {
    const wallet = walletConnectWallet({ chains, projectId });
    const { connector } = wallet.createConnector();
    expect(connector.id).toBe('walletConnect');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectConnector>();
  });

  it('v2 options', () => {
    const wallet = walletConnectWallet({
      chains,
      projectId,
      options: {
        showQrModal: true,
      },
    });
    const { connector } = wallet.createConnector();

    expect(connector.id).toBe('walletConnect');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectConnector>();

    expect(connector.options.qrcode).toBe(undefined);
    expect(connector.options.showQrModal).toBe(true);
  });

  it('v2 walletConnectOptions', () => {
    const wallet = walletConnectWallet({
      chains,
      projectId,
      options: {
        showQrModal: true,
      },
    });
    const { connector } = wallet.createConnector();

    expect(connector.id).toBe('walletConnect');
    expectTypeOf(connector).toMatchTypeOf<WalletConnectConnector>();

    expect(connector.options.qrcode).toBe(undefined);
    expect(connector.options.showQrModal).toBe(true);
  });
});
