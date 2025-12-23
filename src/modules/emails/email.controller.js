
/**
 * SIMULATED EMAIL INGESTION
 * In a production environment, this would be triggered by a SendGrid Inbound Parse 
 * or an IMAP listener. Here, we expose a POST endpoint to simulate the trigger.
 */

const emailService = require('./email.service'); 

exports.ingest = async (req, res, next) => {
  try {
    const result = await emailService.processBulkProducts(
      req.body.products,
      req.body.sourceEmail
    );

    res.json({
      message: 'Email processed',
      inserted: result.inserted
    });
  } catch (error) {
    next(error); 
  }
};