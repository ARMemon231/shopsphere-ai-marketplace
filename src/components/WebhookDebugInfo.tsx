// Debug Component - Add this temporarily to see environment variables
export const WebhookDebugInfo = () => {
  const webhookUrl = import.meta.env.VITE_ORDER_WEBHOOK_URL;
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#1a1a1a',
      color: '#0f0',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      fontFamily: 'monospace',
      maxWidth: '400px',
      zIndex: 9999,
      border: '2px solid #0f0',
    }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#fff' }}>
        🔧 Webhook Debug Info
      </div>
      <div style={{ marginBottom: '5px' }}>
        <strong>VITE_ORDER_WEBHOOK_URL:</strong>
      </div>
      <div style={{ 
        background: '#2a2a2a', 
        padding: '8px', 
        borderRadius: '4px',
        wordBreak: 'break-all',
        marginBottom: '10px'
      }}>
        {webhookUrl || '❌ NOT FOUND'}
      </div>
      <div style={{ fontSize: '11px', color: '#888' }}>
        If this shows "NOT FOUND", restart your dev server!
      </div>
    </div>
  );
};
