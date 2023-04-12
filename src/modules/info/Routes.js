import { Router } from 'express';
import LocalQuote from './localQuote';
import LongDistanceQuote from './longDistanceQuote';
import LoadingQuote from './loadingQuote';
import StorageQuote from './storageQuote';
import PackingQuote from './packingQuote';
import CarHaulingQuote from './carHaulingQuote';
import ContactForm from './contactForm';

const router = Router();

router.post('/localQuote', LocalQuote);
router.post('/longDistanceQuote', LongDistanceQuote);
router.post('/loadingQuote', LoadingQuote);
router.post('/storageQuote', StorageQuote);
router.post('/packingQuote', PackingQuote);
router.post('/carHaulingQuote', CarHaulingQuote);
router.post('/contactForm', ContactForm);

export default router;