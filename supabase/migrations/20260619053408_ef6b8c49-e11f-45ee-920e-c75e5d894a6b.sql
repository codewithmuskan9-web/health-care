CREATE POLICY "Doctors read own files" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'patient-files' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Doctors upload own files" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'patient-files' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Doctors update own files" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'patient-files' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Doctors delete own files" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'patient-files' AND (storage.foldername(name))[1] = auth.uid()::text);