import { Request, Response } from "express";

export const handlePayPalWebhook = async (req: Request, res: Response) => {
  try {
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    const baseUrl =
      process.env.PAYPAL_BASE_URL || "https://api-m.sandbox.paypal.com";

    if (!webhookId) {
      return res.status(500).json({
        success: false,
        message: "PayPal Webhook ID is missing.",
      });
    }

    if (!Buffer.isBuffer(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Raw webhook body is required.",
      });
    }

    const rawBody = req.body.toString("utf8");
    const webhookEvent = JSON.parse(rawBody);

    const {
      "paypal-auth-algo": authAlgo,
      "paypal-cert-url": certUrl,
      "paypal-transmission-id": transmissionId,
      "paypal-transmission-sig": transmissionSig,
      "paypal-transmission-time": transmissionTime,
    } = req.headers;

    if (
      !authAlgo ||
      !certUrl ||
      !transmissionId ||
      !transmissionSig ||
      !transmissionTime
    ) {
      return res.status(400).json({
        success: false,
        message: "PayPal signature headers are missing.",
      });
    }

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("PayPal credentials are missing.");
    }

    // Get PayPal OAuth access token
    const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`,
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!tokenResponse.ok) {
      throw new Error("Unable to obtain PayPal access token.");
    }

    const tokenData = await tokenResponse.json();

    // Verify webhook signature with PayPal
    const verificationResponse = await fetch(
      `${baseUrl}/v1/notifications/verify-webhook-signature`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_algo: authAlgo,
          cert_url: certUrl,
          transmission_id: transmissionId,
          transmission_sig: transmissionSig,
          transmission_time: transmissionTime,
          webhook_id: webhookId,
          webhook_event: webhookEvent,
        }),
      },
    );

    if (!verificationResponse.ok) {
      throw new Error("PayPal signature verification request failed.");
    }

    const verification = await verificationResponse.json();

    if (verification.verification_status !== "SUCCESS") {
      return res.status(400).json({
        success: false,
        message: "Invalid PayPal webhook signature.",
      });
    }

    console.log("Verified PayPal Webhook Event:", webhookEvent.event_type);

    return res.status(200).json({
      success: true,
      message: "PayPal webhook verified successfully.",
    });
  } catch (error) {
    console.error("PayPal Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook verification failed.",
    });
  }
};
