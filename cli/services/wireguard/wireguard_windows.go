package wireguard

func (w *WireGuard) PreUp() error {
	return w.cfg.WriteToFile(w.cfgDir)
}

func (w *WireGuard) RealInterface() (string, error) {
	return w.cfg.Name, nil
}
